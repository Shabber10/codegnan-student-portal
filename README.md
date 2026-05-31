# 🎓 Codegnan LMS Portal

> A premium, high-fidelity replication of the Codegnan Learning Management System (LMS) Portal. Crafted with an ultra-modern aesthetic, dark mode styling, and dynamic components designed to look polished and premium.

🚀 **Live Demo:** [codegnan-student-portal.onrender.com](https://codegnan-student-portal.onrender.com/)

---

## ✨ Features

- **⚡ Modern Responsive Dashboard**: An interactive homepage with user profile details, real-time metrics, streaks, placement updates, and attendance records.
- **📅 Interactive Attendance Heatmap**: Visualizes user's learning consistency with an active multi-month grid displaying simulated attendance density.
- **📚 Dynamic Curriculum Overlay System**: Deep dive into courses (Python, Flask, Frontend, MySQL, DSA, Aptitude, Soft Skills) with dynamic modal drawers.
- **🏆 Interactive Leaderboard**: View active rank lists filtered by Batch, Location, CG Main, and Soft Skills metrics—featuring an active user rank pin.
- **📁 PDF Resume Upload & ATS Score Simulator**: Upload a mock resume to calculate dynamic ATS compliance grades and display full resume audit reports.
- **💬 Floating AI Mascot Chat Assistant**: An interactive assistant that responds dynamically to user messages and streaking queries.
- **🔍 Quick-Access Command Palette (Ctrl + K)**: Instantly jump between SPA views using a premium search drawer with category tagging.
- **📸 Puppeteer-Powered Capturing**: Automatically capture matching screenshots of key portal pages (Home, Curriculum, Profile) for review.

---

## 🛠️ Technology Stack

- **Frontend**: Semantic HTML5, Vanilla JavaScript (ES6+), Premium Custom CSS (Custom CSS variables, gradients, and micro-animations).
- **Icons & Typography**: [FontAwesome 6 Pro](https://fontawesome.com/) Icons, Google Fonts ([Outfit](https://fonts.google.com/specimen/Outfit)).
- **Backend Server**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) (For robust static routing & mock SPA routing fallback).
- **Screenshot Automation**: [Puppeteer-Core](https://pptr.dev/) (Utilizes pre-installed Microsoft Edge or Google Chrome executables).

---

## 🚀 How to Run the Project

You can start the server and load the web portal instantly in your terminal by running one of our dedicated startup scripts:

### 💻 Option A: On Windows (Command Prompt or PowerShell)
Simply run the custom batch file:
```cmd
run.bat
```
*This file will automatically verify Node.js, install missing dependencies (`npm install`), open http://localhost:3000 in your browser, and start the Express server.*

### 🐧 Option B: On macOS, Linux, or Git Bash
Run the custom shell script:
```bash
chmod +x run.sh
./run.sh
```
*Like the Windows equivalent, this script installs packages if needed, launches your default browser, and starts the server.*

### 🛠️ Option C: Manual Launch (Using Node.js)
If you prefer running commands step-by-step:
1. Navigate to the backend folder and install server dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Start the local Express server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to:
   ```url
   http://localhost:3000
   ```

---

## 📸 Automated Screenshot Generator

To take high-resolution, full-viewport snapshots of your portal's key pages (Home, Curriculum, and Profile), follow these steps:

1. Make sure your server is running in a terminal (`http://localhost:3000`).
2. Open a second terminal window in the root directory and run:
   ```bash
   node screenshot.js
   ```
3. The screenshots will be saved directly in your root project folder as:
   - `Replicated_Home_Portal.png`
   - `Replicated_Curriculum_Portal.png`
   - `Replicated_Profile_Portal.png`

---

## 📂 Project Directory Structure

```text
codegnan/
├── backend/                  # Server-side environment
│   ├── node_modules/         # Server-side package dependencies
│   ├── server.js             # Static file server with wildcard Express fallback
│   ├── package.json          # Node.js project manifest & start script
│   └── package-lock.json     # Lockfile for dependency tree validation
├── frontend/                 # Client-side interface
│   ├── images/               # Media assets and graphic logos
│   ├── app.js                # Application Core SPA Router, leaderboards, and AI assistant
│   ├── index.html            # Main HTML layout scaffolding & viewports
│   └── styles.css            # Dark mode variables, structural layout grids, and animations
├── README.md                 # Project documentation (You are here!)
├── run.bat                   # Automated one-click bootstrapper script for Windows
├── run.sh                    # Automated bootstrapper script for Linux/macOS
└── screenshot.js             # Automated Puppeteer screenshot compilation program
```

---

*Made with 💙 by Antigravity AI*
