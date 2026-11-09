/**
 * ACM CodeNite 2027 — Frontend API Client
 * Seamlessly interfaces with the Express backend server with graceful fallback.
 */

import { getAdminToken, setAdminToken } from './adminStore.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

function withAdminToken(headers = {}) {
  const token = getAdminToken();
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}

async function adminFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: withAdminToken(options.headers),
  });
  if (res.status === 401) setAdminToken(null);
  return res;
}

/**
 * Safely parses response without throwing SyntaxError on HTML / non-JSON responses
 */
async function parseResponseSafe(res) {
  const contentType = res.headers.get('content-type') || '';
  let data = null;

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch (_) {
      data = null;
    }
  } else {
    try {
      const text = await res.text();
      // If server returned a clean string message rather than HTML error page
      if (text && !text.includes('<html') && !text.includes('<!DOCTYPE')) {
        data = { message: text };
      }
    } catch (_) {
      data = null;
    }
  }

  if (!res.ok) {
    const errorMsg =
      (data && data.message) ||
      (data && data.error) ||
      `Server temporarily unreachable (Status ${res.status}). Please retry in a moment.`;
    const err = new Error(errorMsg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data || {};
}

/**
 * Check if the backend server is reachable
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) return { online: false };
    const data = await parseResponseSafe(res);
    return { online: true, data };
  } catch {
    return { online: false };
  }
}

/**
 * Register a new squad
 */
export async function registerTeamApi(payload) {
  const res = await fetch(`${API_BASE}/teams/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return await parseResponseSafe(res);
}

/**
 * Fetch all registered teams
 */
export async function fetchTeamsApi(status = '') {
  const url = status ? `${API_BASE}/teams?status=${encodeURIComponent(status)}` : `${API_BASE}/teams`;
  const res = await adminFetch(url);
  const data = await parseResponseSafe(res);
  return data.teams || [];
}

/**
 * Search teams by query
 */
export async function searchTeamsApi(query) {
  const res = await adminFetch(`${API_BASE}/teams/search?q=${encodeURIComponent(query)}`);
  const data = await parseResponseSafe(res);
  return data.teams || [];
}

/**
 * Admin Login
 */
export async function adminLoginApi(username, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return await parseResponseSafe(res);
}

/**
 * Cancel a team registration
 */
export async function cancelTeamApi(registrationId, reason) {
  const res = await adminFetch(`${API_BASE}/admin/teams/${encodeURIComponent(registrationId)}/cancel`, {
    method: 'PATCH',
    headers: withAdminToken({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ reason }),
  });
  return await parseResponseSafe(res);
}

/**
 * Reactivate a team registration
 */
export async function reactivateTeamApi(registrationId) {
  const res = await adminFetch(`${API_BASE}/admin/teams/${encodeURIComponent(registrationId)}/reactivate`, {
    method: 'PATCH',
  });
  return await parseResponseSafe(res);
}

export async function fetchTeamStatusApi(registrationId, email) {
  const res = await fetch(`${API_BASE}/teams/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({ registrationId, email }),
  });
  return await parseResponseSafe(res);
}

export async function downloadTeamsCsvApi() {
  const res = await adminFetch(`${API_BASE}/teams/export/csv`);
  if (!res.ok) await parseResponseSafe(res);
  return res.blob();
}

/**
 * Fetch Admin Stats
 */
export async function fetchStatsApi() {
  const res = await adminFetch(`${API_BASE}/admin/stats`);
  const data = await parseResponseSafe(res);
  return data.stats;
}
