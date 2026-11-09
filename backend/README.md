# ACM CodeNite 2027 — Full Backend Architecture & API Documentation

This directory contains the production-ready backend infrastructure for the **ACM MITS CodeNite 2027** Hackathon portal.

---

## ⚡ Quick Start

Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in the repository-root `.env` file before using organizer login. Start from `.env.example`, replace its placeholders locally, and never commit `.env` or put credentials in frontend code. Production deployments must set both values in the backend host's secret environment settings.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Backend Server
```bash
npm run server
```
The server will boot on `http://localhost:5000`.

### 3. Run Both Frontend and Backend Concurrently
```bash
npm run dev:all
```
- **Frontend (Vite):** `http://localhost:3000`
- **Backend (Express):** `http://localhost:5000`
- API calls from Vite (`/api/*`) are automatically proxied to `http://localhost:5000`.

---

## 🌐 API Endpoints Reference

### 1. Health & Server Info
- **Endpoint:** `GET /api/health`
- **Description:** Verifies backend connectivity, uptime, and total team registrations.
- **Response:**
  ```json
  {
    "status": "ONLINE",
    "service": "ACM CodeNite 2027 Registration API",
    "uptimeSeconds": 42,
    "registeredTeamsCount": 4,
    "activeTeamsCount": 4
  }
  ```

---

### 2. Team Registration
- **Endpoint:** `POST /api/teams/register` (or `POST /api/register`)
- **Headers:** `Content-Type: application/json`
- **Body Example:**
  ```json
  {
    "teamName": "Cyber Sparks",
    "track": "AI & Intelligent Systems",
    "members": [
      {
        "name": "Alex Carter",
        "email": "alex.carter@mitsgwalior.in",
        "phone": "9826012345",
        "college": "MITS Gwalior",
        "enrollmentNo": "0901CS221099",
        "year": "3rd Year",
        "branch": "CSE"
      },
      {
        "name": "Maya Patel",
        "email": "maya.p@mitsgwalior.in",
        "phone": "9826012346",
        "college": "MITS Gwalior",
        "enrollmentNo": "0901IT221088",
        "year": "3rd Year",
        "branch": "IT"
      },
      {
        "name": "Rohan Gupta",
        "email": "rohan.g@mitsgwalior.in",
        "phone": "9826012347",
        "college": "MITS Gwalior",
        "enrollmentNo": "0901EC221077",
        "year": "3rd Year",
        "branch": "ECE"
      },
      {
        "name": "Sarah Khan",
        "email": "sarah.k@mitsgwalior.in",
        "phone": "9826012348",
        "college": "MITS Gwalior",
        "enrollmentNo": "0901AI221066",
        "year": "2nd Year",
        "branch": "AI-DS"
      }
    ]
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Team successfully registered for ACM CodeNite 2027!",
    "registrationId": "CN27-8F9A2B",
    "team": { ... }
  }
  ```

---

### 3. List Teams & Search
- **List All Teams:** `GET /api/teams`
- **Filter by Status:** `GET /api/teams?status=ACTIVE` or `GET /api/teams?status=CANCELLED`
- **Search Query:** `GET /api/teams/search?q=Neural` (Searches by Registration ID, Team Name, Member Name, Email, or Phone)
- **Get Specific Team:** `GET /api/teams/:id` (e.g. `GET /api/teams/CN27-ALPHA1`)

---

### 4. Admin Portal & Management
- **Admin Login:** `POST /api/admin/login`
  - Body: `{ "username": "<ADMIN_USERNAME>", "password": "<ADMIN_PASSWORD>" }`
- **Live Stats & Analytics:** `GET /api/admin/stats`
  - Returns counts of active/cancelled teams, total participants, track popularity, and college distributions.
- **Cancel Team Registration:** `PATCH /api/admin/teams/:id/cancel`
  - Body: `{ "reason": "Fee confirmation unverified", "cancelledBy": "Admin" }`
- **Reactivate Team Registration:** `PATCH /api/admin/teams/:id/reactivate`
- **Purge/Delete Team Record:** `DELETE /api/admin/teams/:id`
- **Export to CSV:** `GET /api/teams/export/csv`
  - Returns a downloadable `.csv` spreadsheet of all registered teams with member details.

---

## 🗄️ Database Storage
- Registration records are stored persistently in `backend/data/teams.json`.
- The file is automatically generated and seeded with demo teams upon startup.
- In production, this can seamlessly transition to MongoDB, PostgreSQL, or SQLite with the same repository interface defined in `backend/db.js`.

---

## ☁️ Google Apps Script (Cloud Fallback / Sheets Sync)
The file `backend/google-apps-script.js` contains a complete Google Apps Script solution to sync registrations directly into Google Sheets and Google Drive (creating branded PDFs and sending automated leader emails).
See the top comments in `backend/google-apps-script.js` for one-click deployment instructions.
