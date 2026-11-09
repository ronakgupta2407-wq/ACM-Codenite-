# CodeNite 2027

The official hackathon website for the ACM MITS Student Chapter at Madhav Institute of Technology & Science (MITS), Gwalior. The site includes event information, a team registration flow, registration status lookup, and an organizer portal.

## Features

- Responsive event landing page with event details, tracks, schedule, prizes, rules, FAQs, sponsors, and organizer information.
- Registration form for teams of 4 to 6 members, with member-specific validation and unique email and phone checks within each team.
- Registration status lookup and an organizer portal for viewing and managing registrations.
- Express API for registrations, team lookup, CSV export, and admin operations.
- Animated visual effects, countdown, and downloadable registration confirmation.

## Tech stack

- React 18 and Vite
- Tailwind CSS
- Framer Motion and Three.js
- React Hook Form and Zod
- Express backend with JSON-file storage

## Requirements

- Node.js 18 or later
- npm

## Run locally

Install dependencies from the repository root:

```bash
npm install
```

Start the frontend and backend together:

```bash
npm run dev:all
```

Open [http://localhost:3000](http://localhost:3000). Vite proxies `/api` requests to the backend at `http://localhost:5000`.

You can also run the services separately:

```bash
npm run dev       # Frontend only
npm run server    # Backend only
```

The backend health endpoint is available at [http://localhost:5000/api/health](http://localhost:5000/api/health).

## Configuration

The backend reads environment variables from the repository-root `.env` file:

| Variable | Purpose |
|---|---|
| `PORT` | Backend port; defaults to `5000`. |
| `ADMIN_USERNAME` | Organizer portal API login username. |
| `ADMIN_PASSWORD` | Organizer portal API login password. |
| `GOOGLE_APPS_SCRIPT_URL` | Optional Google Apps Script web app URL for forwarding registrations to Sheets and retrieving a PDF URL. |

The frontend uses these optional build-time variables:

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL; defaults to `/api`. Set this when the frontend and backend are hosted separately. |
| `VITE_GOOGLE_APPS_SCRIPT_URL` | Optional direct Google Apps Script fallback URL used when the backend cannot be reached. |

Keep credentials and private deployment settings out of source control. For a deployment, configure variables in the hosting provider's environment settings.

## Build and preview

Build the static frontend:

```bash
npm run build
```

The production files are written to `dist/`. Preview the build locally with:

```bash
npm run preview
```

The backend can be started with `npm start` or `npm run server`.

## Backend and data storage

- `backend/server.js` serves the Express API.
- Registration records are stored in `backend/data/teams.json`.
- The frontend also keeps a local browser copy of registrations for offline or fallback behavior.
- If `GOOGLE_APPS_SCRIPT_URL` is configured, the backend can forward successful registrations to a Google Apps Script integration.

The JSON file is suitable for local development, not a multi-instance or ephemeral serverless production deployment. Before deploying the API for real registrations, use persistent shared storage, protect and review admin endpoints, and configure strong private credentials. Deploy the Vite frontend as a static site and host the API on a Node.js service that supports persistent storage, or replace the JSON store with a managed database.

## API overview

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/health` | Backend health and registration counts. |
| `POST` | `/api/teams/register` | Register a team. |
| `GET` | `/api/teams` | List teams; accepts an optional `status` query parameter. |
| `GET` | `/api/teams/search?q=...` | Search teams. |
| `GET` | `/api/teams/:id` | Find a team by registration ID. |
| `GET` | `/api/teams/export/csv` | Download registrations as CSV. |
| `POST` | `/api/admin/login` | Authenticate an organizer. |
| `GET` | `/api/admin/stats` | Read registration statistics. |
| `PATCH` | `/api/admin/teams/:id/cancel` | Cancel a team registration. |
| `PATCH` | `/api/admin/teams/:id/reactivate` | Reactivate a team registration. |
| `DELETE` | `/api/admin/teams/:id` | Delete a team registration. |

See [backend/README.md](backend/README.md) for additional API details.

## Tests

Run the backend API tests with:

```bash
npm run test:api
```
