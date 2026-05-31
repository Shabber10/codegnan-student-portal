/* ==========================================================================
   APPLICATION LOGIC - CODEGNAN LMS PORTAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STATE & DATABASES (LOCALSTORAGE BACKED)
    // ==========================================

    const DEFAULT_USER = {
        studentName: "Shabber Hussain",
        studentID: "CGH3335",
        batchNo: "PFS-HYD-056",
        emailID: "shabberhussain934@gmail.com",
        dob: "2004-08-08",
        age: "21",
        gender: "Male",
        blood: "O+",
        city: "NANDYALA",
        state: "Andhra Pradesh",
        phone: "+917899746857",
        parentPhone: "+919849856198",
        github: "https://github.com/shabber10",
        skills: "Python, Flask, HTML, CSS, Bootstrap, Javascript, MySQL"
    };

    const DEFAULT_METRICS = {
        fireStreak: 12,
        waterStreak: 32,
        sparkStreak: 140,
        xpPoints: 340,
        badgesEarned: 3,
        currentScore: "82.5/100",
        uploadedResume: null,
        atsScore: null
    };

    // Load initial states from LocalStorage or seed defaults
    let user = JSON.parse(localStorage.getItem('codegnan_user')) || DEFAULT_USER;
    let metrics = JSON.parse(localStorage.getItem('codegnan_metrics')) || DEFAULT_METRICS;

    function saveState() {
        localStorage.setItem('codegnan_user', JSON.stringify(user));
        localStorage.setItem('codegnan_metrics', JSON.stringify(metrics));
    }

    // Dynamic mock databases for curriculum
    const CURRICULUM_DATA = {
        python: [
            { module: "Module 1", title: "Python Basics & Core Variables" },
            { module: "Module 2", title: "Control Flows, Loops & Decisions" },
            { module: "Module 3", title: "Data Structures: Lists, Tuples & Dicts" },
            { module: "Module 4", title: "Functional Programming & Scope" },
            { module: "Module 5", title: "File Operations & Error Handling" }
        ],
        flask: [
            { module: "Module 1", title: "Introduction to WSGI & Flask Framework" },
            { module: "Module 2", title: "Routing and URL Building" },
            { module: "Module 3", title: "Jinja2 Templates & Static Assets" },
            { module: "Module 4", title: "Request Object & Form Processing" },
            { module: "Module 5", title: "Flask-SQLAlchemy Database ORM Integration" }
        ],
        frontend: [
            { module: "Module 1", title: "HTML5 Semantic Tags & Structured Layouts" },
            { module: "Module 2", title: "CSS3 Flexbox, CSS Grid & Animation Systems" },
            { module: "Module 3", title: "Vanilla JavaScript ES6+ Syntaxes" },
            { module: "Module 4", title: "DOM Manipulation & API Fetch Actions" },
            { module: "Module 5", title: "Asynchronous JavaScript & SPA State Management" }
        ],
        mysql: [
            { module: "Module 1", title: "Relational Database Management Concepts" },
            { module: "Module 2", title: "SQL Commands: DDL, DML, DCL Statements" },
            { module: "Module 3", title: "Table Relationships, Constraints & Keys" },
            { module: "Module 4", title: "Complex Joins, Inner, Left, Right Unions" },
            { module: "Module 5", title: "Indexes, Sub-queries & Query Optimization" }
        ],
        softskills: [
            { module: "Module 1", title: "Verbal Communication & Active Listening" },
            { module: "Module 2", title: "Body Language & Professional Dressing" },
            { module: "Module 3", title: "Resume Preparation & Resume Tailoring" },
            { module: "Module 4", title: "Interview Dress Codes & Body Etiquettes" },
            { module: "Module 5", title: "Confidence Booster & Handling Rejections" }
        ],
        aptitude: [
            { module: "Module 1", title: "Quantitative Aptitude: Time & Work, Speed" },
            { module: "Module 2", title: "Logical Reasoning: Blood Relations, Directional Tests" },
            { module: "Module 3", title: "Verbal Ability: Synonyms, Error Corrections" },
            { module: "Module 4", title: "Data Interpretation: Bar Charts, Pie Diagrams" }
        ],
        dsa: [
            { module: "Module 1", title: "Time & Space Complexities (Big O Notation)" },
            { module: "Module 2", title: "Arrays, LinkedLists & Stacks, Queues" },
            { module: "Module 3", title: "Tree Traversals, BFS & DFS Searching Algorithms" },
            { module: "Module 4", title: "Sorting Paradigms, QuickSort, MergeSort" },
            { module: "Module 5", title: "Graph Matrices & Dynamic Programming Baselines" }
        ]
    };

    // Leaderboard database that updates dynamically based on active filter
    const LEADERBOARD_DATA = {
        batch: {
            podium: [
                { rank: 2, name: "Depangi", id: "PFS-HYD-056", points: "250 Points", letter: "DP", border: "silver" },
                { rank: 1, name: "Kummari", id: "PFS-HYD-056", points: "380 Points", letter: "KM", border: "gold" },
                { rank: 3, name: "Harshitha", id: "PFS-HYD-056", points: "210 Points", letter: "H", border: "bronze" }
            ],
            list: [
                { rank: 4, name: "Gandham Anuhya", id: "PFS-HYD-056", points: 190, letter: "GA", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256" },
                { rank: 5, name: "N Jagadeesh", id: "PFS-HYD-056", points: 175, letter: "NJ" },
                { rank: 6, name: "Uyyala Veena", id: "PFS-HYD-056", points: 160, letter: "UV" },
                { rank: 7, name: "Chandini Priya", id: "PFS-HYD-056", points: 145, letter: "CP", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=256" }
            ],
            userRank: { rank: 8, points: 120 }
        },
        location: {
            podium: [
                { rank: 2, name: "Raja Sekhar", id: "PFS-HYD-056", points: "310 Points", letter: "RS", border: "silver" },
                { rank: 1, name: "Moni Shankar", id: "PFS-VIJ-023", points: "450 Points", letter: "MS", border: "gold" },
                { rank: 3, name: "Lakshmi Narayana", id: "PFS-HYD-056", points: "290 Points", letter: "LN", border: "bronze" }
            ],
            list: [
                { rank: 4, name: "K Swarna Latha", id: "PFS-VIJ-023", points: 280, letter: "KS" },
                { rank: 5, name: "B Ramu", id: "PFS-HYD-056", points: 260, letter: "BR" },
                { rank: 6, name: "P Siva Krishna", id: "PFS-VIJ-023", points: 245, letter: "PS" },
                { rank: 7, name: "G Harish", id: "PFS-HYD-056", points: 230, letter: "GH" }
            ],
            userRank: { rank: 12, points: 120 }
        },
        cg: {
            podium: [
                { rank: 2, name: "Uday Sree", id: "CG-MAIN-001", points: "920 Points", letter: "US", border: "silver" },
                { rank: 1, name: "Kishore Kumar", id: "CG-MAIN-005", points: "1050 Points", letter: "KK", border: "gold" },
                { rank: 3, name: "Shalini Sree", id: "CG-MAIN-002", points: "890 Points", letter: "SS", border: "bronze" }
            ],
            list: [
                { rank: 4, name: "Sai Krishna", id: "CG-MAIN-008", points: 840, letter: "SK" },
                { rank: 5, name: "Venu Gopal", id: "CG-MAIN-004", points: 790, letter: "VG" },
                { rank: 6, name: "Divya Teja", id: "CG-MAIN-009", points: 750, letter: "DT" },
                { rank: 7, name: "Praveen Raj", id: "CG-MAIN-012", points: 710, letter: "PR" }
            ],
            userRank: { rank: 48, points: 340 }
        },
        softskills: {
            podium: [
                { rank: 2, name: "Nivedita", id: "PFS-HYD-056", points: "95% Score", letter: "N", border: "silver" },
                { rank: 1, name: "Shabber Hussain", id: "PFS-HYD-056", points: "98% Score", letter: "SH", border: "gold" },
                { rank: 3, name: "Anil Kumar", id: "PFS-HYD-056", points: "92% Score", letter: "AK", border: "bronze" }
            ],
            list: [
                { rank: 4, name: "Pranathi", id: "PFS-HYD-056", points: "90%", letter: "PR" },
                { rank: 5, name: "Triveni", id: "PFS-HYD-056", points: "88%", letter: "TR" },
                { rank: 6, name: "Murali Dhar", id: "PFS-HYD-056", points: "85%", letter: "MD" },
                { rank: 7, name: "Divya", id: "PFS-HYD-056", points: "82%", letter: "D" }
            ],
            userRank: { rank: 1, points: "98%" }
        }
    };

    // ==========================================
    // 2. UI SYNCING UTILITIES
    // ==========================================

    function syncUserUI() {
        // Sync header welcome & top menu
        document.getElementById('homeWelcomeTitle').textContent = `Good Night, ${user.studentName.split(' ')[0]}`;
        document.querySelector('.user-name-small').textContent = user.studentName.split(' ')[0];
        document.querySelector('.user-email-small').textContent = user.emailID;
        document.getElementById('profileStudentName').textContent = user.studentName;

        // Profile personal card fields
        document.getElementById('pStudentName').textContent = user.studentName;
        document.getElementById('pStudentID').textContent = user.studentID;
        document.getElementById('pBatchNo').textContent = user.batchNo;
        document.getElementById('pEmailID').textContent = user.emailID;
        document.getElementById('pDOB').textContent = user.dob;
        document.getElementById('pAge').textContent = user.age;
        document.getElementById('pGender').textContent = user.gender;
        document.getElementById('pBlood').textContent = user.blood;
        document.getElementById('pCity').textContent = user.city;
        document.getElementById('pState').textContent = user.state;
        document.getElementById('pPhone').textContent = user.phone;
        document.getElementById('pParentPhone').textContent = user.parentPhone;
        document.getElementById('pGithub').textContent = user.github;

        // Profile academic card fields
        document.getElementById('aSkills').textContent = user.skills;
    }

    function syncMetricsUI() {
        // Top navbar badges
        document.getElementById('fireStreakVal').textContent = metrics.fireStreak;
        document.getElementById('waterStreakVal').textContent = metrics.waterStreak;
        document.getElementById('sparkStreakVal').textContent = metrics.sparkStreak;
        document.getElementById('xpStreakVal').textContent = `${metrics.xpPoints} XP`;

        // Side streaks rows
        document.getElementById('streaksAttendanceVal').textContent = metrics.waterStreak;
        document.getElementById('streaksDailyVal').textContent = metrics.fireStreak;
        document.getElementById('streaksMockVal').textContent = metrics.fireStreak > 5 ? 1 : 0;

        // Achievements cards & banners
        document.getElementById('badgesCountVal').textContent = metrics.badgesEarned;
        document.getElementById('badgesCountSummary').textContent = `${metrics.badgesEarned} of 51 earned`;
        document.getElementById('achievementBadgesVal').textContent = `${metrics.badgesEarned} / 51`;
        
        let percent = Math.round((metrics.badgesEarned / 51) * 100);
        document.getElementById('achievementCompleteVal').textContent = `${percent}%`;

        // Resume / ATS UI Updates
        if (metrics.uploadedResume) {
            document.getElementById('resumeLabel').textContent = metrics.uploadedResume;
        } else {
            document.getElementById('resumeLabel').textContent = "Choose PDF";
        }

        if (metrics.atsScore) {
            document.getElementById('profileCurrentScore').textContent = `${metrics.atsScore}/100`;
        } else {
            document.getElementById('profileCurrentScore').textContent = "82.5/100";
        }
    }

    // Initialize UI on startup
    syncUserUI();
    syncMetricsUI();


    // ==========================================
    // 3. COLLAPSIBLE SIDEBAR ROUTER SYSTEM
    // ==========================================

    const sidebar = document.querySelector('.sidebar-wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const stripeIcons = document.querySelectorAll('.stripe-icon');
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.viewport-page');

    // Sidebar Collapsible action
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Navigation switching function (SPA style)
    function switchPage(pageTarget) {
        // Clear active states on sidebar items
        navItems.forEach(item => item.classList.remove('active'));
        stripeIcons.forEach(icon => icon.classList.remove('active'));

        // Highlight correct active nav items
        navItems.forEach(item => {
            if (item.getAttribute('data-page') === pageTarget) {
                item.classList.add('active');
            }
        });

        stripeIcons.forEach(icon => {
            if (icon.getAttribute('data-target') === pageTarget) {
                icon.classList.add('active');
            }
        });

        // Hide all pages, show requested
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const targetEl = document.getElementById(`${pageTarget}-page`);
        if (targetEl) {
            targetEl.classList.add('active');
        } else {
            // Under construction fallback placeholders
            document.getElementById('placeholder-page').classList.add('active');
            document.getElementById('placeholderTitle').textContent = `${pageTarget.toUpperCase()} View Portal`;
        }
    }

    // Sidebar Nav Item Clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const page = item.getAttribute('data-page');
            if (page) {
                e.preventDefault();
                switchPage(page);
            }
        });
    });

    // Mini Stripe icon clicks (for collapsed responsive layout view)
    stripeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const page = icon.getAttribute('data-target');
            if (page) {
                switchPage(page);
            }
        });
    });

    // Link triggers from Achievements / Placement carousels
    document.querySelectorAll('[data-page]').forEach(trigger => {
        if (!trigger.classList.contains('nav-item') && !trigger.classList.contains('stripe-icon')) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                switchPage(trigger.getAttribute('data-page'));
            });
        }
    });

    // Dropdown toggle action
    const dropdownTrigger = document.getElementById('userDropdownTrigger');
    const dropdownPanel = document.getElementById('userDropdownPanel');

    dropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownTrigger.classList.toggle('active');
        dropdownPanel.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        dropdownTrigger.classList.remove('active');
        dropdownPanel.classList.remove('show');
    });


    // ==========================================
    // 4. ATTENDANCE HEATMAP GENERATOR
    // ==========================================

    const months = ['jan', 'feb', 'mar', 'apr', 'may'];
    const daysInMonths = { jan: 31, feb: 28, mar: 31, apr: 30, may: 31 };

    months.forEach(month => {
        const grid = document.getElementById(`${month}Squares`);
        if (grid) {
            const totalDays = daysInMonths[month];
            for (let i = 1; i <= totalDays; i++) {
                const sq = document.createElement('div');
                sq.classList.add('heatmap-square');
                
                // Add random shade class to simulate high-fidelity attendance records
                let rand = Math.random();
                if (rand < 0.6) {
                    sq.classList.add('shade-0'); // No class attended
                } else if (rand < 0.8) {
                    sq.classList.add('shade-2'); // Moderate presence
                } else if (rand < 0.9) {
                    sq.classList.add('shade-3'); // Active attendee
                } else {
                    sq.classList.add('shade-4'); // Highly active / Multiple events
                }

                sq.title = `${month.toUpperCase()} ${i}: Full Attendance Recorded`;
                grid.appendChild(sq);
            }
        }
    });


    // ==========================================
    // 5. MOCK PLACEMENT CAROUSEL SLIDER
    // ==========================================

    const slides = document.querySelectorAll('.placed-slide');
    let currentSlideIdx = 0;

    function showSlide(idx) {
        slides.forEach(s => s.classList.remove('active'));
        slides[idx].classList.add('active');
    }

    document.getElementById('placedNext').addEventListener('click', () => {
        currentSlideIdx = (currentSlideIdx + 1) % slides.length;
        showSlide(currentSlideIdx);
    });

    document.getElementById('placedPrev').addEventListener('click', () => {
        currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
        showSlide(currentSlideIdx);
    });


    // ==========================================
    // 6. DYNAMIC MASTERY LEADERBOARD
    // ==========================================

    const pillBtns = document.querySelectorAll('.pill-btn');
    const podiumArea = document.getElementById('podiumArea');
    const performerList = document.getElementById('performerList');

    function renderLeaderboard(filter) {
        const data = LEADERBOARD_DATA[filter];
        
        // Render Podiums
        let podiumHtml = '';
        data.podium.forEach(student => {
            let crownIcon = student.rank === 1 ? `<i class="fa-solid fa-crown gold-crown-floating"></i>` : '';
            podiumHtml += `
                <div class="podium-col rank-${student.rank}">
                    <div class="podium-avatar-box">
                        <div class="avatar-letter border-${student.border}">
                            ${crownIcon}
                            ${student.letter}
                        </div>
                        <span class="badge-rank shadow-${student.border}">${student.rank}</span>
                    </div>
                    <span class="podium-name">${student.name}</span>
                    <span class="podium-id">${student.id}</span>
                    <span class="podium-points"><i class="fa-solid fa-trophy text-gold"></i> ${student.points}</span>
                </div>
            `;
        });
        podiumArea.innerHTML = podiumHtml;

        // Render Performer Lists
        let listHtml = '';
        data.list.forEach(student => {
            let avatarHtml = student.img 
                ? `<img src="${student.img}" class="row-avatar">` 
                : `<div class="row-avatar-letter">${student.letter}</div>`;

            listHtml += `
                <div class="leaderboard-row">
                    <div class="row-left">
                        <span class="row-rank-num">${student.rank}.</span>
                        ${avatarHtml}
                        <div class="row-student-detail">
                            <span class="row-student-name">${student.name}</span>
                            <span class="row-student-batch">${student.id}</span>
                        </div>
                    </div>
                    <span class="row-points"><i class="fa-solid fa-trophy text-slate"></i> ${student.points}</span>
                </div>
            `;
        });

        // Add Active User's Highlighted Row Float
        listHtml += `
            <div class="leaderboard-row active-highlight">
                <div class="row-left">
                    <span class="row-rank-num">${data.userRank.rank}.</span>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256" class="row-avatar">
                    <div class="row-student-detail">
                        <span class="row-student-name">${user.studentName}</span>
                        <span class="row-student-batch">${user.batchNo}</span>
                    </div>
                </div>
                <span class="row-points"><i class="fa-solid fa-trophy text-blue"></i> ${data.userRank.points}</span>
            </div>
        `;
        performerList.innerHTML = listHtml;
    }

    // Toggle clicks
    pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLeaderboard(btn.getAttribute('data-filter'));
        });
    });

    // Render default leaderboard
    renderLeaderboard('batch');


    // ==========================================
    // 7. GLOBAL COMMAND PALETTE SEARCH (CTRL + K)
    // ==========================================

    const searchBarBtn = document.getElementById('searchBarBtn');
    const searchPaletteModal = document.getElementById('searchPaletteModal');
    const closeSearchPaletteBtn = document.getElementById('closeSearchPaletteBtn');
    const paletteSearchInput = document.getElementById('paletteSearchInput');
    const paletteResults = document.getElementById('paletteResults');

    const SEARCHABLE_ROUTES = [
        { title: "Dashboard / Home", cat: "Navigation", route: "home", icon: "fa-house" },
        { title: "Student Curriculum / My Course", cat: "Navigation", route: "curriculum", icon: "fa-book-open" },
        { title: "Exam Center", cat: "Learning", route: "exams", icon: "fa-pen-clip" },
        { title: "Exam Performance Reports", cat: "Learning", route: "exam-reports", icon: "fa-chart-line" },
        { title: "Playground Compiler", cat: "Playground", route: "playground", icon: "fa-code" },
        { title: "Coding Leaderboard", cat: "Playground", route: "code-leaderboard", icon: "fa-trophy" },
        { title: "Placement Jobs Center", cat: "Career", route: "jobs", icon: "fa-briefcase" },
        { title: "Mock Interview Prep", cat: "Career", route: "interview", icon: "fa-microphone" },
        { title: "Unlocked Badges", cat: "Achievements", route: "achievements", icon: "fa-shield-halved" },
        { title: "Student Profile Manager", cat: "Profile", route: "profile", icon: "fa-circle-user" }
    ];

    function showPalette() {
        searchPaletteModal.classList.add('show');
        paletteSearchInput.value = '';
        paletteSearchInput.focus();
        renderPaletteItems(SEARCHABLE_ROUTES);
    }

    function hidePalette() {
        searchPaletteModal.classList.remove('show');
    }

    function renderPaletteItems(items) {
        if (items.length === 0) {
            paletteResults.innerHTML = `<div class="empty-state-container"><span class="empty-state-text-sub">No matching routes found</span></div>`;
            return;
        }

        paletteResults.innerHTML = items.map((item, idx) => `
            <div class="palette-result-item ${idx === 0 ? 'selected' : ''}" data-route="${item.route}">
                <div class="result-icon"><i class="fa-solid ${item.icon}"></i></div>
                <div class="result-info">
                    <span class="result-title">${item.title}</span>
                    <span class="result-cat">${item.cat}</span>
                </div>
            </div>
        `).join('');

        // Result Item Click Events
        document.querySelectorAll('.palette-result-item').forEach(el => {
            el.addEventListener('click', () => {
                const targetPage = el.getAttribute('data-route');
                switchPage(targetPage);
                hidePalette();
            });
        });
    }

    // Global Key Listening for Ctrl + K and ESC
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showPalette();
        }
        if (e.key === 'Escape') {
            hidePalette();
        }
    });

    searchBarBtn.addEventListener('click', showPalette);
    closeSearchPaletteBtn.addEventListener('click', hidePalette);

    // Dynamic filtering of options in command palette
    paletteSearchInput.addEventListener('input', () => {
        const val = paletteSearchInput.value.toLowerCase().trim();
        const filtered = SEARCHABLE_ROUTES.filter(route => 
            route.title.toLowerCase().includes(val) || route.cat.toLowerCase().includes(val)
        );
        renderPaletteItems(filtered);
    });


    // ==========================================
    // 8. PROFILE FIELD EDITOR DIALOG MODAL
    // ==========================================

    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditProfileBtn = document.getElementById('closeEditProfileBtn');
    const editProfileForm = document.getElementById('editProfileForm');
    const editFieldKey = document.getElementById('editFieldKey');
    const editFieldLabel = document.getElementById('editFieldLabel');
    const editFieldValue = document.getElementById('editFieldValue');

    // Attach click triggers on editable fields
    document.querySelectorAll('.field-value.editable').forEach(field => {
        field.addEventListener('click', () => {
            const key = field.getAttribute('data-field');
            const currentText = field.textContent;

            editFieldKey.value = key;
            editFieldLabel.textContent = `Update value for ${key.toUpperCase()}`;
            editFieldValue.value = currentText;

            editProfileModal.classList.add('show');
            editFieldValue.focus();
        });
    });

    closeEditProfileBtn.addEventListener('click', () => {
        editProfileModal.classList.remove('show');
    });

    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const key = editFieldKey.value;
        const newVal = editFieldValue.value.trim();

        if (newVal) {
            user[key] = newVal;
            saveState();
            syncUserUI();
            
            // Highlight update visually with mascot bubble message
            showMascotMessage(`I've updated your profile details, Shabber! ✅`);
        }

        editProfileModal.classList.remove('show');
    });


    // ==========================================
    // 9. RESUME UPLOAD & ATS SIMULATOR
    // ==========================================

    const resumeDropZone = document.getElementById('resumeDropZone');
    const resumeFileInput = document.getElementById('resumeFileInput');
    const resumeUploadBtn = document.getElementById('resumeUploadBtn');

    resumeDropZone.addEventListener('click', () => {
        resumeFileInput.click();
    });

    resumeFileInput.addEventListener('change', () => {
        if (resumeFileInput.files.length > 0) {
            const filename = resumeFileInput.files[0].name;
            document.getElementById('resumeLabel').textContent = filename;
            showMascotMessage(`Nice! Click "Upload" to analyze your resume.`);
        }
    });

    resumeUploadBtn.addEventListener('click', () => {
        if (resumeFileInput.files.length > 0) {
            const filename = resumeFileInput.files[0].name;
            metrics.uploadedResume = filename;
            
            // Dynamic ATS scoring simulation based on skills match
            let baseScore = 75 + Math.floor(Math.random() * 15);
            metrics.atsScore = baseScore;

            saveState();
            syncMetricsUI();
            showMascotMessage(`Resume uploaded successfully! Let's check your ATS score. 🌀`);
        } else {
            showMascotMessage(`Please choose a PDF resume file first!`);
        }
    });

    // ATS Score dialog Report render
    const atsScoreBtn = document.getElementById('atsScoreBtn');
    const atsScoreModal = document.getElementById('atsScoreModal');
    const closeAtsBtn = document.getElementById('closeAtsBtn');
    const atsScoreDetails = document.getElementById('atsScoreDetails');

    atsScoreBtn.addEventListener('click', () => {
        if (!metrics.uploadedResume) {
            showMascotMessage(`Please upload your PDF resume first to view the ATS Report!`);
            return;
        }

        // Show radial grade calculation & feedback reports
        atsScoreModal.classList.add('show');
        
        atsScoreDetails.innerHTML = `
            <div class="ats-score-box">
                <div class="ats-radial-progress" id="atsProgressCircle">
                    <div class="ats-radial-inner">
                        <span class="ats-percentage-big">${metrics.atsScore}</span>
                        <span class="metric-label">ATS Grade</span>
                    </div>
                </div>
                
                <h4 class="side-card-title">Full Resume Audit Report</h4>
                <div class="ats-analysis-details">
                    <div class="ats-analysis-row">
                        <span class="ats-analysis-label">Parsed File Name</span>
                        <span class="ats-analysis-val">${metrics.uploadedResume}</span>
                    </div>
                    <div class="ats-analysis-row">
                        <span class="ats-analysis-label">Core Skills Match</span>
                        <span class="ats-analysis-val color-green">Pass (94% Skills Matched)</span>
                    </div>
                    <div class="ats-analysis-row">
                        <span class="ats-analysis-label">Formatting Check</span>
                        <span class="ats-analysis-val color-green">Excellent (Standard PDF format)</span>
                    </div>
                    <div class="ats-analysis-row">
                        <span class="ats-analysis-label">Grammar & Syntax Errors</span>
                        <span class="ats-analysis-val color-green">0 Issues found</span>
                    </div>
                    <div class="ats-analysis-row">
                        <span class="ats-analysis-label">Missing Critical Sections</span>
                        <span class="ats-analysis-val color-red">GitHub link needs profile prefix</span>
                    </div>
                </div>
            </div>
        `;

        // Update radial progress circle dynamically
        const progressEl = document.getElementById('atsProgressCircle');
        progressEl.style.background = `conic-gradient(var(--primary) ${metrics.atsScore}%, var(--border-light) ${metrics.atsScore}%)`;
    });

    closeAtsBtn.addEventListener('click', () => {
        atsScoreModal.classList.remove('show');
    });


    // ==========================================
    // 10. CURRICULUM OVERLAY MODALS
    // ==========================================

    const courseCurriculumModal = document.getElementById('courseCurriculumModal');
    const closeCurriculumBtn = document.getElementById('closeCurriculumBtn');
    const curriculumSubjectTitle = document.getElementById('curriculumSubjectTitle');
    const curriculumDetails = document.getElementById('curriculumDetails');

    document.querySelectorAll('.know-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const subject = btn.getAttribute('data-subject');
            const data = CURRICULUM_DATA[subject];
            
            curriculumSubjectTitle.textContent = `${subject.toUpperCase()} Course Curriculum Details`;
            courseCurriculumModal.classList.add('show');

            curriculumDetails.innerHTML = data.map(mod => `
                <div class="curriculum-module-row">
                    <span class="module-num">${mod.module}</span>
                    <span class="module-title">${mod.title}</span>
                </div>
            `).join('');
        });
    });

    closeCurriculumBtn.addEventListener('click', () => {
        courseCurriculumModal.classList.remove('remove');
        courseCurriculumModal.classList.remove('show');
    });


    // ==========================================
    // 11. FLOATING AI MASCOT CHAT DRAWER
    // ==========================================

    const chatbotMascotTrigger = document.getElementById('chatbotMascotTrigger');
    const mascotSpeechBubble = document.getElementById('mascotSpeechBubble');
    const chatbotDrawer = document.getElementById('chatbotDrawer');
    const closeChatbotBtn = document.getElementById('closeChatbotBtn');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');

    function showMascotMessage(msg) {
        mascotSpeechBubble.textContent = msg;
        mascotSpeechBubble.classList.add('show');
    }

    chatbotMascotTrigger.addEventListener('click', () => {
        chatbotDrawer.classList.add('show');
    });

    closeChatbotBtn.addEventListener('click', () => {
        chatbotDrawer.classList.remove('show');
    });

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('chat-message', sender);
        div.textContent = text;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function processAiResponse(userInput) {
        let clean = userInput.toLowerCase();
        let resp = "That's a great question, Shabber! You should check your Achievements timeline or complete a course module to boost your streak points.";

        if (clean.includes('hello') || clean.includes('hi')) {
            resp = `Hi Shabber! Ready to crushing your goals today? Let's check your Python curriculum or academic details.`;
        } else if (clean.includes('streak') || clean.includes('score')) {
            resp = `Your current fire streak is ${metrics.fireStreak} and total score is ${metrics.currentScore}. Keep up the great work!`;
        } else if (clean.includes('resume') || clean.includes('ats')) {
            resp = `Your uploaded resume grade is ${metrics.atsScore || 'N/A'}. You can upload a PDF and click "ATS Score" in the Profile page for a complete audit report.`;
        } else if (clean.includes('python') || clean.includes('flask')) {
            resp = `Python and Flask modules are available in your Learning curriculum. Click "Know More" on My Course to view all units.`;
        }

        setTimeout(() => {
            appendMessage(resp, 'bot');
        }, 600);
    }

    function handleChatSend() {
        const txt = chatbotInput.value.trim();
        if (txt) {
            appendMessage(txt, 'user');
            chatbotInput.value = '';
            processAiResponse(txt);
        }
    }

    sendChatBtn.addEventListener('click', handleChatSend);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChatSend();
        }
    });

    // Auto greetings mascot speech bubble updates in home page dashboard
    setTimeout(() => {
        showMascotMessage(`Ready to learn, Shabber? 🚀`);
    }, 4000);

    setTimeout(() => {
        showMascotMessage(`Press Ctrl+K to search pages! 🔍`);
    }, 12000);

    // ==========================================
    // 12. THEME TOGGLE (LIGHT / DARK) SYSTEM
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Check local storage theme on startup (default space gray dark)
    const currentTheme = localStorage.getItem('codegnan_theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        let newTheme = 'dark';
        if (document.body.classList.contains('light-theme')) {
            newTheme = 'light';
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            showMascotMessage('Switched to Apple Light Mode! ☀️');
        } else {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            showMascotMessage('Back to Space Gray Dark Mode! 🌙');
        }
        localStorage.setItem('codegnan_theme', newTheme);
    });

});

