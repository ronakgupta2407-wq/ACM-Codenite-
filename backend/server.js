import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import teamsRouter from './routes/teams.js';
import adminRouter from './routes/admin.js';
import { getAllTeams } from './db.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers with support for base64 screenshots up to 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
app.post('/api/register', (req, res, next) => {
  req.url = '/register';
  teamsRouter(req, res, next);
});

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
});

export default app;
