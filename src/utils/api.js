/**
 * ACM CodeNite 2027 — Frontend API Client
 * Seamlessly interfaces with the Express backend server with graceful fallback.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Check if the backend server is reachable
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) return { online: false };
    const data = await res.json();
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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Server responded with status ${res.status}`);
  }
  return data;
}

/**
 * Fetch all registered teams
 */
export async function fetchTeamsApi(status = '') {
  const url = status ? `${API_BASE}/teams?status=${encodeURIComponent(status)}` : `${API_BASE}/teams`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch teams');
  return data.teams || [];
}

/**
 * Search teams by query
 */
export async function searchTeamsApi(query) {
  const res = await fetch(`${API_BASE}/teams/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to search teams');
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
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Invalid administrator credentials');
  return data;
}

/**
 * Cancel a team registration
 */
export async function cancelTeamApi(registrationId, reason) {
  const res = await fetch(`${API_BASE}/admin/teams/${encodeURIComponent(registrationId)}/cancel`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to cancel registration');
  return data;
}

/**
 * Reactivate a team registration
 */
export async function reactivateTeamApi(registrationId) {
  const res = await fetch(`${API_BASE}/admin/teams/${encodeURIComponent(registrationId)}/reactivate`, {
    method: 'PATCH',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to reactivate registration');
  return data;
}

/**
 * Fetch Admin Stats
 */
export async function fetchStatsApi() {
  const res = await fetch(`${API_BASE}/admin/stats`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch stats');
  return data.stats;
}
