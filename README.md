<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=250&section=header&text=Codegnan%20Student%20Portal&fontSize=55&animation=fadeIn&fontAlignY=38&desc=Premium%20LMS%20Dashboard%20%7C%20Dark%20Mode%20%7C%20AI%20Assistant&descAlignY=56&descAlign=50"/>

  [![Live Demo – Render](https://img.shields.io/badge/Live%20Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://codegnan-student-portal.onrender.com/)
  &nbsp;
  [![Live Demo – Netlify](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://codegnan-shabber.netlify.app/)
</div>

# 🎓 Codegnan Student Portal

**Codegnan Student Portal** is a premium, high-fidelity replication of the Codegnan Learning Management System (LMS). Crafted with an ultra-modern aesthetic, dark-mode-first styling, glassmorphism UI, and dynamic micro-animations — designed to look and feel completely polished and production-ready.

---

## 🌐 Live Demos

| Platform | Link |
|----------|------|
| 🟢 **Render** | [codegnan-student-portal.onrender.com](https://codegnan-student-portal.onrender.com/) |
| 🔵 **Netlify** | [codegnan-shabber.netlify.app](https://codegnan-shabber.netlify.app/) |

---

## ✨ Features

- **⚡ Modern Responsive Dashboard** — Interactive homepage with user profile, real-time metrics, streaks, placement updates, and attendance records.
- **📅 Interactive Attendance Heatmap** — Visualizes learning consistency with a multi-month grid showing simulated attendance density.
- **📚 Dynamic Curriculum Overlay System** — Deep-dive into courses (Python, Flask, Frontend, MySQL, DSA, Aptitude, Soft Skills) through animated modal drawers.
- **🏆 Interactive Leaderboard** — Active rank lists filtered by Batch, Location, CG Main, and Soft Skills metrics, with a live rank pin for the active user.
- **📁 PDF Resume Upload & ATS Score Simulator** — Upload a mock resume to calculate dynamic ATS compliance grades and display a full resume audit report.
- **💬 Floating AI Mascot Chat Assistant** — An interactive assistant that responds dynamically to user messages and streak-related queries.
- **🔍 Quick-Access Command Palette (Ctrl + K)** — Instantly jump between SPA views using a premium search drawer with category tagging.
- **📸 Puppeteer-Powered Screenshot Capture** — Automatically captures full-viewport snapshots of key portal pages (Home, Curriculum, Profile).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, Vanilla JavaScript (ES6+), Custom CSS (Variables, Gradients, Micro-animations) |
| **Icons & Fonts** | FontAwesome 6, Google Fonts – [Outfit](https://fonts.google.com/specimen/Outfit) |
| **Backend** | [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) |
| **Automation** | [Puppeteer-Core](https://pptr.dev/) (Microsoft Edge / Chrome) |

---

## 🚀 Getting Started

### 💻 Option A — Windows (One-Click)
```cmd
run.bat
```
> Verifies Node.js, installs dependencies, opens `http://localhost:3000` in your browser, and starts the Express server automatically.

---

### 🐧 Option B — macOS / Linux / Git Bash
```bash
chmod +x run.sh
./run.sh
```
> Same as the Windows script — installs packages, launches your default browser, and starts the server.

---

### 🛠️ Option C — Manual Setup
```bash
# 1. Install dependencies
npm install

# 2. Start the server
node index.js

# 3. Open in browser
http://localhost:3000
```

---

## 📸 Automated Screenshot Generator

Capture high-resolution, full-viewport snapshots of the portal's key pages:

1. Make sure the server is running at `http://localhost:3000`.
2. Open a second terminal in the root directory and run:
   ```bash
   node screenshot.js
   ```
3. Screenshots are saved in the project root as:
   - `Replicated_Home_Portal.png`
   - `Replicated_Curriculum_Portal.png`
   - `Replicated_Profile_Portal.png`

---

## 📂 Project Structure

```text
codegnan/
├── backend/                  # Server-side environment
│   ├── node_modules/         # Server-side package dependencies
│   ├── server.js             # Static file server with Express wildcard fallback
│   ├── package.json          # Node.js project manifest & start script
│   └── package-lock.json     # Dependency lockfile
├── frontend/                 # Client-side interface
│   ├── images/               # Media assets and graphic logos
│   ├── app.js                # SPA Router, leaderboards, and AI assistant
│   ├── index.html            # Main HTML layout & viewports
│   └── styles.css            # Dark mode variables, layout grids, and animations
├── index.js                  # Root entry point
├── package.json              # Root-level project manifest
├── README.md                 # Project documentation (You are here!)
├── run.bat                   # One-click bootstrapper for Windows
├── run.sh                    # Bootstrapper for Linux / macOS
└── screenshot.js             # Puppeteer screenshot automation
```

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer"/>
</div>

<div align="center">
  Made with 💙 by <strong>Shabber Hussain</strong>
</div>
