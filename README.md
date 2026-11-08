# CodeNite 2027 — Official Hackathon Portal
### ACM MITS Student Chapter, Madhav Institute of Technology & Science, Gwalior

A production-ready, high-performance, dark-first web platform and registration system engineered for **CodeNite 2027**, the flagship 12-hour overnight technical hackathon organized by the ACM MITS Student Chapter on **17 January 2027**.

---

## 🚀 Key Features

- **Theme & Design System**: Dark-first deep navy palette (`#020617`, `#0A1128`), ACM Blue (`#0085CA`), Electric Sky (`#38BDF8`), and Cyan neon glow (`#22D3EE`).
- **Interactive Animations**:
  - Full-screen ACM logo SVG circular loader with percentage counter and curtain wipe exit.
  - Interactive 3D tilt cards with cursor-following radial spotlight gradients.
  - Live countdown clock with flip-digit animation targeting **17 January 2027, 08:00 PM IST**.
  - Animated code terminal with simulated syntax-highlighted protocol configuration.
  - Animated vertical timeline drawing on scroll with pulsing time nodes.
  - Particle star field, cyber mesh grid, and glowing floating ambient orbs.
  - Infinite sponsor marquee banner with grayscale-to-color transition on hover.
  - Custom glowing cursor trail (automatically disabled on touch devices).
  - Lenis smooth scrolling (60fps target) with top scroll progress bar.
- **Strict Registration Engine**:
  - Multi-step animated stepper form powered by **React Hook Form** + **Zod** schema validation.
  - Dynamic squad generator strictly enforcing **either 4 or 6 members** (no other team sizes permitted).
  - Explicit confirmation: **NO mandatory female participant quota** (zero gender restrictions).
  - Automatic designation of Member 1 as the Team Leader.
  - Email uniqueness verification across team members.
  - Success state featuring SVG checkmark animation and festive celebratory confetti bursts.
  - Persistent form state handling with draft preservation.
- **Modals & Overlays**:
  - First-visit welcome modal with key event highlights and quick CTA.
  - Interactive track detail popup modals with problem statements.
  - "Registration closing soon" alert toast banner.
- **Single-Source Data Architecture**: All event copy, dates, prizes, tracks, rules, FAQs, and contacts reside in `src/data/codeniteData.js` for zero-code content updates.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) with custom tokens |
| **Motion & Animation** | [Framer Motion](https://www.framer.com/motion/) + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Smooth Scroll** | [Lenis](https://github.com/darkroomengineering/lenis) |
| **Form & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | Orbitron, Space Grotesk, Inter, JetBrains Mono |

---

## 📁 Folder Structure

```
ACM CodeNite/
├── backend/
│   └── google-apps-script.js       # Production Google Sheets Webhook API
├── public/
│   └── acm-mits-logo.png           # High-resolution ACM MITS Chapter Logo
├── src/
│   ├── assets/
│   │   └── acm-mits-logo.png
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Accordion.jsx       # Smooth height animated collapsible
│   │   │   ├── Button.jsx          # Shine sweep, ripple, magnetic pull & states
│   │   │   ├── Card.jsx            # 3D mouse tilt & radial spotlight
│   │   │   ├── Countdown.jsx       # Digital flip-card countdown clock
│   │   │   ├── Loader.jsx          # SVG circular progress & curtain wipe
│   │   │   ├── Modal.jsx           # Accessible dialog with AnimatePresence
│   │   │   ├── SectionHeading.jsx  # Glowing title & animated underline sweep
│   │   │   └── Stepper.jsx         # Multi-step animated progress stepper
│   │   ├── BackgroundEffects.jsx   # Grid mesh, stars & neon orbs
│   │   ├── CustomCursor.jsx        # Glow cursor trail (touch-safe)
│   │   ├── Navbar.jsx              # Sticky glass bar, scroll spy & mobile drawer
│   │   ├── ScrollProgress.jsx      # Top cyan progress bar
│   │   ├── ToastNotification.jsx   # Closing soon floating alert
│   │   └── WelcomeModal.jsx        # First visit intro popup
│   ├── data/
│   │   └── codeniteData.js         # Single source of truth for all content
│   ├── hooks/
│   │   ├── useCountdown.js         # Tick calculation hook
│   │   ├── useLocalStorage.js      # Safe persistence hook
│   │   ├── useMousePosition.js     # Cursor tracking hook
│   │   └── useScrollSpy.js         # Active section viewport tracker
│   ├── sections/
│   │   ├── Hero.jsx                # Title glitch, chips, countdown, code card
│   │   ├── About.jsx               # Chapter story & animated counter stats
│   │   ├── Tracks.jsx              # Hover cards & problem statement modal
│   │   ├── Timeline.jsx            # Scroll-animated vertical schedule
│   │   ├── Prizes.jsx              # Podium cards (1st, 2nd, 3rd) & track awards
│   │   ├── Rules.jsx               # Guidelines & eligibility accordion
│   │   ├── TeamGuide.jsx           # 4-member vs 6-member visual blueprints
│   │   ├── Sponsors.jsx            # Infinite animated marquee
│   │   ├── Team.jsx                # Organizing committee cards & socials
│   │   ├── FAQ.jsx                 # Collapsible query resolver
│   │   ├── Registration.jsx        # 4-step dynamic registration engine
│   │   └── Footer.jsx              # Map embed, contacts & copyright
│   ├── utils/
│   │   ├── cn.js                   # Classnames utility
│   │   └── confetti.js             # Canvas confetti burst preset
│   ├── App.jsx                     # Master application container
│   ├── index.css                   # Global styles & glassmorphism tokens
│   └── main.jsx                    # React root entry
├── index.html                      # SEO metadata & Google Fonts
├── package.json                    # Dependencies & scripts
├── postcss.config.js
├── tailwind.config.js              # Custom theme tokens & keyframes
└── vite.config.js                  # Vite configuration
```

---

## ⚡ Installation & Run Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📊 Google Sheets Form Backend Setup

A ready-to-deploy Google Apps Script is provided in `backend/google-apps-script.js`:

1. Open [Google Sheets](https://sheets.new) and create a new blank sheet.
2. Go to **Extensions > Apps Script**.
3. Replace all code in `Code.gs` with the contents of `backend/google-apps-script.js`.
4. Click **Deploy > New deployment**.
5. Select **Web app**, set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
6. Click **Deploy**, authorize permissions, and copy the Web App URL.
7. In `src/sections/Registration.jsx`, uncomment the `fetch()` call and paste your Web App URL.
8. Submissions will automatically format headers, organize members, and send auto-confirmation emails to the registered Team Leader!

---

## 👥 ACM MITS Technical Team
- **Organizer**: ACM MITS Student Chapter
- **Institution**: Madhav Institute of Technology & Science (MITS), Gwalior
- **Event**: CodeNite 2027
