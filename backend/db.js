import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'teams.json');

// Ensure directory and file exists
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Read all teams from storage
 */
export function getAllTeams() {
  try {
    ensureStorage();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading teams database:', error);
    return [];
  }
}

/**
 * Write all teams back to storage
 */
function writeTeams(teams) {
  ensureStorage();
  fs.writeFileSync(DATA_FILE, JSON.stringify(teams, null, 2), 'utf-8');
}

/**
 * Find team by Registration ID
 */
export function getTeamById(registrationId) {
  if (!registrationId) return null;
  const cleanId = String(registrationId).trim().toUpperCase();
  const teams = getAllTeams();
  return teams.find((t) => t.registrationId && t.registrationId.toUpperCase() === cleanId) || null;
}

/**
 * Search teams by registrationId, teamName, leader email, or leader phone
 */
export function searchTeams(query) {
  if (!query) return [];
  const clean = String(query).trim().toUpperCase();
  const teams = getAllTeams();
  return teams.filter((t) => {
    const idMatch = t.registrationId && t.registrationId.toUpperCase().includes(clean);
    const nameMatch = t.teamName && t.teamName.toUpperCase().includes(clean);
    const trackMatch = t.track && t.track.toUpperCase().includes(clean);
    const memberMatch = Array.isArray(t.members) && t.members.some((m) =>
      (m.name && m.name.toUpperCase().includes(clean)) ||
      (m.email && m.email.toUpperCase().includes(clean)) ||
      (m.phone && m.phone.includes(clean)) ||
      (m.enrollmentNo && m.enrollmentNo.toUpperCase().includes(clean))
    );
    return idMatch || nameMatch || trackMatch || memberMatch;
  });
}

/**
 * Insert or register a new team
 */
export function createTeam(teamData) {
  const teams = getAllTeams();

  // Generate unique registrationId if not provided
  let regId = teamData.registrationId;
  if (!regId) {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    regId = `CN27-${randomHex}`;
  }

  // Ensure unique ID
  while (teams.some((t) => t.registrationId.toUpperCase() === regId.toUpperCase())) {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    regId = `CN27-${randomHex}`;
  }

  const newTeam = {
    ...teamData,
    registrationId: regId,
    status: teamData.status || 'ACTIVE',
    timestamp: teamData.timestamp || new Date().toISOString(),
    cancelledBy: null,
    cancelledAt: null,
    cancellationReason: null,
  };

  teams.unshift(newTeam);
  writeTeams(teams);
  return newTeam;
}

/**
 * Update team status (ACTIVE / CANCELLED)
 */
export function updateTeamStatus(registrationId, status, { cancelledBy, reason } = {}) {
  const cleanId = String(registrationId).trim().toUpperCase();
  const teams = getAllTeams();
  let updatedTeam = null;

  const nextTeams = teams.map((team) => {
    if (team.registrationId && team.registrationId.toUpperCase() === cleanId) {
      if (status === 'CANCELLED') {
        updatedTeam = {
          ...team,
          status: 'CANCELLED',
          cancelledBy: cancelledBy || 'Admin',
          cancelledAt: new Date().toISOString(),
          cancellationReason: reason || 'Cancelled by administrator',
        };
      } else {
        updatedTeam = {
          ...team,
          status: 'ACTIVE',
          cancelledBy: null,
          cancelledAt: null,
          cancellationReason: null,
        };
      }
      return updatedTeam;
    }
    return team;
  });

  if (updatedTeam) {
    writeTeams(nextTeams);
  }
  return updatedTeam;
}

/**
 * Delete a team by registration ID
 */
export function deleteTeam(registrationId) {
  const cleanId = String(registrationId).trim().toUpperCase();
  const teams = getAllTeams();
  const filtered = teams.filter((t) => t.registrationId && t.registrationId.toUpperCase() !== cleanId);
  const deleted = filtered.length !== teams.length;
  if (deleted) {
    writeTeams(filtered);
  }
  return deleted;
}

/**
 * Get aggregated statistics for the Hackathon
 */
export function getStats() {
  const teams = getAllTeams();
  const totalTeams = teams.length;
  const activeTeams = teams.filter((t) => t.status === 'ACTIVE').length;
  const cancelledTeams = teams.filter((t) => t.status === 'CANCELLED').length;

  let totalParticipants = 0;
  const trackDistribution = {};
  const collegeDistribution = {};

  teams.forEach((team) => {
    const size = parseInt(team.teamSize, 10) || (team.members ? team.members.length : 0);
    if (team.status === 'ACTIVE') {
      totalParticipants += size;
    }

    if (team.track) {
      trackDistribution[team.track] = (trackDistribution[team.track] || 0) + 1;
    }

    if (Array.isArray(team.members)) {
      team.members.forEach((m) => {
        if (m.college) {
          const col = m.college.trim();
          collegeDistribution[col] = (collegeDistribution[col] || 0) + 1;
        }
      });
    }
  });

  return {
    totalTeams,
    activeTeams,
    cancelledTeams,
    totalParticipants,
    trackDistribution,
    collegeDistribution,
  };
}

/**
 * Generate CSV representation of all teams for easy export
 */
export function generateCSV() {
  const teams = getAllTeams();
  const headers = [
    'Registration ID',
    'Team Name',
    'Team Size',
    'Status',
    'Registered At',
    'Leader Name',
    'Leader Email',
    'Leader Phone',
    'Leader Gender',
    'Leader College',
    'Leader Enrollment',
    'Leader Year',
    'Leader Branch',
    'Leader City',
    'Cancellation Reason',
    'All Members Details'
  ];

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const value = String(str);
    const safeValue = /^[\s\u0000-\u001f\u007f-\u009f]*[=+\-@]/u.test(value)
      ? `'${value}`
      : value;
    const s = safeValue.replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = teams.map((team) => {
    const leader = team.members && team.members[0] ? team.members[0] : {};
    const allMembers = Array.isArray(team.members)
      ? team.members.map((m, idx) => `[M${idx + 1}: ${m.name || ''} | ${m.email || ''} | ${m.phone || ''} | ${m.gender || ''} | ${m.college || ''} | ${m.enrollmentNo || ''} | ${m.year || ''} | ${m.branch || ''} | ${m.city || ''}]`).join('; ')
      : '';

    return [
      escapeCSV(team.registrationId),
      escapeCSV(team.teamName),
      escapeCSV(team.teamSize),
      escapeCSV(team.status),
      escapeCSV(team.timestamp),
      escapeCSV(leader.name),
      escapeCSV(leader.email),
      escapeCSV(leader.phone),
      escapeCSV(leader.gender),
      escapeCSV(leader.college),
      escapeCSV(leader.enrollmentNo),
      escapeCSV(leader.year),
      escapeCSV(leader.branch),
      escapeCSV(leader.city),
      escapeCSV(team.cancellationReason),
      escapeCSV(allMembers),
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
