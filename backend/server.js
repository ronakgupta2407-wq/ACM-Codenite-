import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import teamsRouter from './routes/teams.js';
import adminRouter from './routes/admin.js';
import { getAllTeams } from './db.js';
import { createRateLimiter } from './security.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
app.disable('x-powered-by');
if (process.env.RENDER) app.set('trust proxy', 1);

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)),
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (req.path.startsWith('/api')) res.setHeader('Cache-Control', 'no-store');
  if (req.secure || req.get('x-forwarded-proto') === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb', parameterLimit: 100 }));

// Lightweight request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const teams = getAllTeams();
  res.json({
    status: 'ONLINE',
    service: 'ACM CodeNite 2027 Registration API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    registeredTeamsCount: teams.length,
    activeTeamsCount: teams.filter((t) => t.status === 'ACTIVE').length,
  });
});

// API Routes
app.use('/api/teams', teamsRouter);
app.use('/api/admin', adminRouter);

// Convenient alias for direct POST /api/register
app.post('/api/register', createRateLimiter({ limit: 10, windowMs: 10 * 60 * 1000 }), (req, res, next) => {
  req.url = '/register';
  teamsRouter(req, res, next);
});

// Serve frontend build in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// 404 Fallback for unhandled /api routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' does not exist on this server.`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start listening
const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 ACM CodeNite 2027 Backend Server Running!`);
  console.log(`📡 URL:       http://localhost:${PORT}`);
  console.log(`🩺 Health:    http://localhost:${PORT}/api/health`);
  console.log(`👥 Teams:     http://localhost:${PORT}/api/teams`);
  console.log(`📊 Stats:     http://localhost:${PORT}/api/admin/stats`);
  console.log(`📥 CSV:       http://localhost:${PORT}/api/teams/export/csv`);
  console.log(`======================================================\n`);

  // Automatic Keep-Alive Ping for Render Free Tier (Prevents 15-minute Sleep / Cold Start)
  // Render automatically injects RENDER_EXTERNAL_URL (e.g. https://acm-codenite.onrender.com)
  const externalUrl = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL;
  if (externalUrl) {
    console.log(`⚡ Keep-Alive active: Pinging ${externalUrl}/api/health every 13 minutes`);
    const PING_INTERVAL = 13 * 60 * 1000;
    setInterval(async () => {
      try {
        const pingRes = await fetch(`${externalUrl}/api/health`, {
          signal: AbortSignal.timeout(10000),
        });
        if (pingRes.ok) {
          console.log(`[Keep-Alive] Self-ping successful at ${new Date().toLocaleTimeString('en-IN')}`);
        }
      } catch (err) {
        console.warn(`[Keep-Alive] Notice: ${err.message}`);
      }
    }, PING_INTERVAL);
  }
});

export default app;
