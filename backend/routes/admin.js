import express from 'express';
import {
  updateTeamStatus,
  deleteTeam,
  getStats,
  getTeamById,
} from '../db.js';

const router = express.Router();

/**
 * POST /api/admin/login
 * Validates admin credentials
 */
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;
    if (!adminUser || !adminPass) {
      return res.status(503).json({
        success: false,
        message: 'Administrator login is not configured on this server.',
      });
    }

    if (username.trim() === adminUser && password.trim() === adminPass) {
      // Simple signed token simulation or session token
      const token = `acm_auth_${Buffer.from(`${username}:${Date.now()}`).toString('base64')}`;
      return res.json({
        success: true,
        message: 'Admin authentication successful',
        token,
        admin: {
          username: adminUser,
          role: 'administrator',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials. Access denied.',
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, message: 'Internal authentication error' });
  }
});

/**
 * GET /api/admin/stats
 * Aggregated live statistics
 */
router.get('/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Error retrieving stats:', error);
    res.status(500).json({ success: false, message: 'Internal error retrieving stats' });
  }
});

/**
 * PATCH /api/admin/teams/:id/cancel
 * Admin action to cancel a team's registration
 */
router.patch('/teams/:id/cancel', (req, res) => {
  try {
    const { id } = req.params;
    const { reason, cancelledBy } = req.body || {};

    const existing = getTeamById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Team with ID '${id}' not found.`,
      });
    }

    const updated = updateTeamStatus(id, 'CANCELLED', {
      cancelledBy: cancelledBy || (process.env.ADMIN_USERNAME
        ? `Admin (${process.env.ADMIN_USERNAME})`
        : 'Admin'),
      reason: reason || 'Registration cancelled by CodeNite Administrator',
    });

    res.json({
      success: true,
      message: `Registration for team '${updated.teamName}' (${updated.registrationId}) marked as CANCELLED.`,
      team: updated,
    });
  } catch (error) {
    console.error('Error cancelling team:', error);
    res.status(500).json({ success: false, message: 'Internal error cancelling team registration' });
  }
});

/**
 * PATCH /api/admin/teams/:id/reactivate
 * Admin action to reactivate a cancelled team
 */
router.patch('/teams/:id/reactivate', (req, res) => {
  try {
    const { id } = req.params;
    const existing = getTeamById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Team with ID '${id}' not found.`,
      });
    }

    const updated = updateTeamStatus(id, 'ACTIVE');

    res.json({
      success: true,
      message: `Team '${updated.teamName}' (${updated.registrationId}) has been successfully REACTIVATED.`,
      team: updated,
    });
  } catch (error) {
    console.error('Error reactivating team:', error);
    res.status(500).json({ success: false, message: 'Internal error reactivating team registration' });
  }
});

/**
 * DELETE /api/admin/teams/:id
 * Permanent deletion of a team record
 */
router.delete('/teams/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteTeam(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Team with ID '${id}' not found or already deleted.`,
      });
    }

    res.json({
      success: true,
      message: `Team '${id}' has been permanently purged from the system.`,
    });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ success: false, message: 'Internal error deleting team' });
  }
});

export default router;
