import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_SECONDS = 30 * 60;
const TOKEN_ISSUER = 'acm-codenite-admin';

function getTokenSecret() {
  const secret = process.env.AUTH_TOKEN_SECRET;
  return typeof secret === 'string' && secret.length >= 32 ? secret : null;
}

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
    process.env.ADMIN_PASSWORD &&
    process.env.ADMIN_PASSWORD.length >= 12 &&
    getTokenSecret()
  );
}

export function createAdminToken(username) {
  const secret = getTokenSecret();
  if (!secret) {
    throw new Error('AUTH_TOKEN_SECRET must contain at least 32 characters.');
  }

  const payload = Buffer.from(JSON.stringify({
    sub: username,
    iss: TOKEN_ISSUER,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  })).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function isValidAdminToken(token) {
  const secret = getTokenSecret();
  if (!secret || typeof token !== 'string') return false;

  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return false;

  const expected = createHmac('sha256', secret).update(payload).digest();
  let actual;
  try {
    actual = Buffer.from(signature, 'base64url');
  } catch {
    return false;
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return claims.iss === TOKEN_ISSUER &&
      claims.sub === process.env.ADMIN_USERNAME &&
      Number.isInteger(claims.exp) &&
      claims.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function requireAdmin(req, res, next) {
  if (!isAdminAuthConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'Administrator authentication is not securely configured.',
    });
  }

  const authorization = req.get('authorization') || '';
  const match = authorization.match(/^Bearer ([A-Za-z0-9._-]+)$/);
  if (!match || !isValidAdminToken(match[1])) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required or session expired.',
    });
  }

  return next();
}

export function createRateLimiter({ limit, windowMs, key = (req) => req.ip }) {
  const entries = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const bucketKey = key(req) || 'unknown';
    let entry = entries.get(bucketKey);

    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      entries.set(bucketKey, entry);
    }

    entry.count += 1;
    if (entry.count > limit) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    if (entries.size > 1000) {
      for (const [key, value] of entries) {
        if (value.resetAt <= now) entries.delete(key);
      }
    }
    return next();
  };
}
