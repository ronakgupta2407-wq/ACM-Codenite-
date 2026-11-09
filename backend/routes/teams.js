import express from 'express';
import {
  getAllTeams,
  getTeamById,
  searchTeams,
  createTeam,
  generateCSV,
} from '../db.js';

const router = express.Router();

/**
 * Returns a human-readable, formatted Indian Standard Time (IST) timestamp
 * Example: "10/11/2026, 12:18:46 am IST"
 */
function getIndianTimestamp() {
  return (
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date()) + ' IST'
  );
}

/**
 * GET /api/teams
 * Query params: ?status=ACTIVE|CANCELLED &search=...
 */
router.get('/', (req, res) => {
  try {
    const { status, search } = req.query;
    let teams = getAllTeams();

    if (status) {
      const cleanStatus = status.toUpperCase();
      teams = teams.filter((t) => t.status && t.status.toUpperCase() === cleanStatus);
    }

    if (search) {
      const cleanSearch = search.toUpperCase();
      teams = teams.filter((t) => {
        const idMatch = t.registrationId && t.registrationId.toUpperCase().includes(cleanSearch);
        const nameMatch = t.teamName && t.teamName.toUpperCase().includes(cleanSearch);
        const trackMatch = t.track && t.track.toUpperCase().includes(cleanSearch);
        const memberMatch = Array.isArray(t.members) && t.members.some((m) =>
          (m.name && m.name.toUpperCase().includes(cleanSearch)) ||
          (m.email && m.email.toUpperCase().includes(cleanSearch)) ||
          (m.phone && m.phone.includes(cleanSearch))
        );
        return idMatch || nameMatch || trackMatch || memberMatch;
      });
    }

    res.json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ success: false, message: 'Internal server error while fetching teams' });
  }
});

/**
 * GET /api/teams/search
 * Query params: ?q=...
 */
router.get('/search', (req, res) => {
  try {
    const query = req.query.q || req.query.query || '';
    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query parameter is required' });
    }
    const results = searchTeams(query);
    res.json({
      success: true,
      count: results.length,
      teams: results,
    });
  } catch (error) {
    console.error('Error searching teams:', error);
    res.status(500).json({ success: false, message: 'Internal server error while searching' });
  }
});

/**
 * GET /api/teams/export/csv
 * Downloads a spreadsheet-compatible CSV of all teams
 */
router.get('/export/csv', (req, res) => {
  try {
    const csvData = generateCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=acm-codenite-teams-${Date.now()}.csv`);
    res.status(200).send(csvData);
  } catch (error) {
    console.error('Error generating CSV export:', error);
    res.status(500).json({ success: false, message: 'Failed to generate CSV export' });
  }
});

/**
 * GET /api/teams/:id
 * Retrieve a specific team by registration ID
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const team = getTeamById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: `Team with registration ID '${id}' not found.`,
      });
    }

    res.json({
      success: true,
      team,
    });
  } catch (error) {
    console.error('Error retrieving team:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/**
 * POST /api/teams/register
 * Validates and records a new team
 */
router.post('/register', async (req, res) => {
  try {
    const body = req.body || {};
    const { teamName, track, members, teamSize } = body;

    // Basic Validation - Team Name and Squad Size
    if (!teamName || typeof teamName !== 'string' || teamName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'A valid team name (at least 2 characters) is required.',
      });
    }

    if (!Array.isArray(members) || members.length < 4 || members.length > 6) {
      return res.status(400).json({
        success: false,
        message: 'A valid squad must contain between 4 and 6 registered members.',
      });
    }

    // Validate each member has required 9 fields
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const memberRole = i === 0 ? 'Team Leader' : `Member ${i + 1}`;
      if (!m || !m.name || !m.email || !m.phone || !m.college || !m.enrollmentNo) {
        return res.status(400).json({
          success: false,
          message: `${memberRole} must provide Name, Email, Phone, College, and Enrollment Number.`,
        });
      }
    }

    const leader = members[0];
    if (!leader || !leader.name || !leader.email || !leader.phone) {
      return res.status(400).json({
        success: false,
        message: 'Team Leader must provide a valid Name, Email, and Phone number.',
      });
    }

    // Check for duplicate team name (active teams)
    const existingTeams = getAllTeams();
    const duplicateTeam = existingTeams.find(
      (t) => t.status === 'ACTIVE' && t.teamName.trim().toLowerCase() === teamName.trim().toLowerCase()
    );
    if (duplicateTeam) {
      return res.status(409).json({
        success: false,
        message: `Team name '${teamName}' is already registered and active. Please pick a unique team name.`,
      });
    }

    // Check if leader email is already used in an active team
    const duplicateLeader = existingTeams.find(
      (t) =>
        t.status === 'ACTIVE' &&
        Array.isArray(t.members) &&
        t.members.some((m) => m.email && m.email.trim().toLowerCase() === leader.email.trim().toLowerCase())
    );
    if (duplicateLeader) {
      return res.status(409).json({
        success: false,
        message: `Member email '${leader.email}' is already registered with team '${duplicateLeader.teamName}' (${duplicateLeader.registrationId}).`,
      });
    }

    // Save team locally in database
    const created = createTeam({
      teamName: teamName.trim(),
      track: (track || 'General Innovation').trim(),
      teamSize: String(members.length),
      members,
      paymentScreenshot: body.paymentScreenshot || null,
      notes: body.notes || null,
      timestamp: getIndianTimestamp(),
    });

    let pdfUrl = null;
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    // Relay to Google Apps Script (Live Google Sheets & Drive PDF creation)
    if (scriptUrl) {
      try {
        const scriptRes = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(created),
          signal: AbortSignal.timeout(9000),
        });
        const scriptData = await scriptRes.json();
        if (scriptData && scriptData.pdfUrl) {
          pdfUrl = scriptData.pdfUrl;
          created.pdfUrl = pdfUrl;
        }
      } catch (scriptErr) {
        console.warn('[Google Sheets Sync] Sync notice:', scriptErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Team successfully registered for ACM CodeNite 2027!',
      registrationId: created.registrationId,
      team: created,
      pdfUrl: pdfUrl || created.pdfUrl || null,
    });
  } catch (error) {
    console.error('Error during team registration:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error processing registration.',
    });
  }
});

export default router;
