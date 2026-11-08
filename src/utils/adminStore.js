/**
 * ACM MITS CodeNite 2027 - Shared Team Registrations & Admin Store
 * Handles registration state, team search, admin cancellation, and live sync.
 */

const STORAGE_KEY = "acm_codenite_registered_teams";
const ADMIN_AUTH_KEY = "acm_codenite_admin_auth";

// Initial seed teams so the admin portal is immediately rich with data
const INITIAL_SEED_TEAMS = [
  {
    registrationId: "CN27-ALPHA1",
    teamName: "Neural Ninjas",
    track: "AI & Intelligent Systems",
    teamSize: "4",
    status: "ACTIVE", // "ACTIVE" | "CANCELLED"
    timestamp: "2026-11-06T14:30:00.000Z",
    cancelledBy: null,
    cancelledAt: null,
    cancellationReason: null,
    members: [
      { name: "Devansh Saxena", email: "devansh.cs@mitsgwalior.in", phone: "9826012345", college: "MITS Gwalior", enrollmentNo: "0901CS221034", year: "3rd Year", branch: "CSE" },
      { name: "Ananya Sharma", email: "ananya.sh@mitsgwalior.in", phone: "9826012346", college: "MITS Gwalior", enrollmentNo: "0901CS221015", year: "3rd Year", branch: "CSE" },
      { name: "Kabir Mehra", email: "kabir.m@mitsgwalior.in", phone: "9826012347", college: "MITS Gwalior", enrollmentNo: "0901IT221056", year: "3rd Year", branch: "IT" },
      { name: "Ria Sengupta", email: "ria.s@mitsgwalior.in", phone: "9826012348", college: "MITS Gwalior", enrollmentNo: "0901AI221089", year: "2nd Year", branch: "AI-DS" }
    ]
  },
  {
    registrationId: "CN27-BETA88",
    teamName: "Cipher Blockers",
    track: "Web3 & Decentralized Futures",
    teamSize: "6",
    status: "ACTIVE",
    timestamp: "2026-11-07T10:15:00.000Z",
    cancelledBy: null,
    cancelledAt: null,
    cancellationReason: null,
    members: [
      { name: "Aditya Pratap", email: "aditya.p@mitsgwalior.in", phone: "9893112233", college: "MITS Gwalior", enrollmentNo: "0901CS211005", year: "4th Year", branch: "CSE" },
      { name: "Tanvi Verma", email: "tanvi.v@mitsgwalior.in", phone: "9893112234", college: "MITS Gwalior", enrollmentNo: "0901IT211024", year: "4th Year", branch: "IT" },
      { name: "Harsh Vardhan", email: "harsh.v@mitsgwalior.in", phone: "9893112235", college: "MITS Gwalior", enrollmentNo: "0901CS211054", year: "4th Year", branch: "CSE" },
      { name: "Pooja Mishra", email: "pooja.m@mitsgwalior.in", phone: "9893112236", college: "MITS Gwalior", enrollmentNo: "0901EC211078", year: "4th Year", branch: "ECE" },
      { name: "Yash Tiwari", email: "yash.t@mitsgwalior.in", phone: "9893112237", college: "MITS Gwalior", enrollmentNo: "0901CS221099", year: "3rd Year", branch: "CSE" },
      { name: "Simran Kaur", email: "simran.k@mitsgwalior.in", phone: "9893112238", college: "MITS Gwalior", enrollmentNo: "0901AI221045", year: "3rd Year", branch: "AI-DS" }
    ]
  },
  {
    registrationId: "CN27-CYBER9",
    teamName: "ZeroDay Guardians",
    track: "Cybersecurity & Zero Trust",
    teamSize: "4",
    status: "ACTIVE",
    timestamp: "2026-11-08T09:00:00.000Z",
    cancelledBy: null,
    cancelledAt: null,
    cancellationReason: null,
    members: [
      { name: "Rishabh Jain", email: "rishabh.j@mitsgwalior.in", phone: "9755223344", college: "MITS Gwalior", enrollmentNo: "0901CS221077", year: "3rd Year", branch: "CSE" },
      { name: "Shreya Dubey", email: "shreya.d@mitsgwalior.in", phone: "9755223345", college: "MITS Gwalior", enrollmentNo: "0901IT221067", year: "3rd Year", branch: "IT" },
      { name: "Aman Gupta", email: "aman.g@mitsgwalior.in", phone: "9755223346", college: "MITS Gwalior", enrollmentNo: "0901CS221012", year: "3rd Year", branch: "CSE" },
      { name: "Siddharth Roy", email: "siddharth.r@mitsgwalior.in", phone: "9755223347", college: "MITS Gwalior", enrollmentNo: "0901EC221088", year: "3rd Year", branch: "ECE" }
    ]
  }
];

export function getRegisteredTeams() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_TEAMS));
      return INITIAL_SEED_TEAMS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read teams from storage", err);
    return INITIAL_SEED_TEAMS;
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
