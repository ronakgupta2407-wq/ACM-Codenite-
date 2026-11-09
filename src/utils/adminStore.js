/**
 * ACM MITS CodeNite 2027 - Shared Team Registrations & Admin Store
 * Handles registration state, team search, admin cancellation, and live sync.
 */

const STORAGE_KEY = "acm_codenite_registered_teams";
const ADMIN_AUTH_KEY = "acm_codenite_admin_auth";

const LEGACY_TEST_TEAM_IDS = new Set([
  "CN27-ALPHA1",
  "CN27-BETA88",
  "CN27-CYBER9",
  "CN27-VANG55",
]);

export function getRegisteredTeams() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const storedTeams = JSON.parse(raw);
    if (!Array.isArray(storedTeams)) {
      throw new TypeError("Stored registrations must be an array");
    }

    const teams = storedTeams.filter(
      (team) => !LEGACY_TEST_TEAM_IDS.has(team.registrationId)
    );
    if (teams.length !== storedTeams.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
    }
    return teams;
  } catch (err) {
    console.error("Failed to read teams from storage", err);
    return [];
  }
}

export function saveRegisteredTeam(teamData) {
  try {
    const existing = getRegisteredTeams();
    const newRecord = {
      ...teamData,
      status: "ACTIVE",
      timestamp: teamData.timestamp || new Date().toISOString(),
      cancelledBy: null,
      cancelledAt: null,
      cancellationReason: null,
    };
    const updated = [newRecord, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("acm_teams_updated", { detail: updated }));
    return newRecord;
  } catch (err) {
    console.error("Failed to save team", err);
    throw err;
  }
}

export function cancelTeamRegistration(registrationId, reason = "Cancelled by Administrator") {
  try {
    const existing = getRegisteredTeams();
    const updated = existing.map((team) => {
      if (team.registrationId.toUpperCase() === registrationId.toUpperCase()) {
        return {
          ...team,
          status: "CANCELLED",
          cancelledBy: "Admin (ACMCODENITE)",
          cancelledAt: new Date().toISOString(),
          cancellationReason: reason,
        };
      }
      return team;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("acm_teams_updated", { detail: updated }));
    return true;
  } catch (err) {
    console.error("Failed to cancel team registration", err);
    return false;
  }
}

export function reactivateTeamRegistration(registrationId) {
  try {
    const existing = getRegisteredTeams();
    const updated = existing.map((team) => {
      if (team.registrationId.toUpperCase() === registrationId.toUpperCase()) {
        return {
          ...team,
          status: "ACTIVE",
          cancelledBy: null,
          cancelledAt: null,
          cancellationReason: null,
        };
      }
      return team;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("acm_teams_updated", { detail: updated }));
    return true;
  } catch (err) {
    console.error("Failed to reactivate team registration", err);
    return false;
  }
}

export function searchTeamById(query) {
  if (!query) return null;
  const clean = query.trim().toUpperCase();
  const teams = getRegisteredTeams();
  return teams.find(
    (t) =>
      t.registrationId.toUpperCase() === clean ||
      t.teamName.toUpperCase().includes(clean) ||
      t.members?.some((m) => m.email?.toUpperCase() === clean || m.phone === clean)
  );
}

export function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(val) {
  try {
    if (val) sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
    else sessionStorage.removeItem(ADMIN_AUTH_KEY);
    window.dispatchEvent(new CustomEvent("acm_admin_auth_changed", { detail: val }));
  } catch (err) {
    console.error("Auth state error", err);
  }
}
