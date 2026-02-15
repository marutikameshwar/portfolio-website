document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.mission-card, .time-entry, .profile-card, .section-header');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Add styles for the observed classes
    const style = document.createElement('style');
    style.innerHTML = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Card Tilt Effect (3D)
    const cards = document.querySelectorAll('.mission-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rot
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 2.5 Cyber Particles Generation
    const particlesContainer = document.querySelector('.cyber-particles');
    if (particlesContainer) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }


    // 2.6 Genesis Easter Egg
    const genesisBtn = document.getElementById('genesis-btn');
    const timeline = document.querySelector('.timeline-cyber');

    if (genesisBtn && timeline) {
        // Reveal button on footer hover
        const footer = document.querySelector('.timeline-footer');
        if (footer) {
            footer.addEventListener('mouseenter', () => footer.style.opacity = '1');
            footer.addEventListener('mouseleave', () => footer.style.opacity = '0');
        }

        genesisBtn.addEventListener('click', () => {
            // Create New Entry
            const entry = document.createElement('div');
            entry.classList.add('time-entry', 'genesis-entry');
            entry.innerHTML = `
                <div class="time-marker" style="background: var(--secondary); box-shadow: 0 0 10px var(--secondary);"></div>
                <div class="time-date" style="color: var(--secondary);">APR 09, 2001</div>
                <div class="time-content" style="border-left: 2px solid var(--secondary);">
                    <h4 style="color: var(--secondary);">PLAYER CREATED</h4>
                    <span class="role-badge" style="border-color: var(--secondary); color: var(--secondary);">SYSTEM GENESIS</span>
                    <p style="margin-top: 0.5rem; color: var(--text-gray);">
                        <span class="terminal-prompt">></span> System Initialization Complete.<br>
                        <span class="terminal-prompt">></span> A new player has entered the game world.
                    </p>
                    <ul class="xp-list">
                        <li style="color: var(--text-white);">"I WAS BORN"</li>
                        <li style="color: var(--text-white);">"PLAYER CONNECTED"</li>
                    </ul>
                </div>
            `;

            // Append and Animate
            timeline.appendChild(entry);

            // Scroll to new entry
            entry.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Glitch Effect on Entry
            entry.style.opacity = '0';
            setTimeout(() => {
                entry.style.opacity = '1';
                entry.style.transform = 'translateY(0)';
            }, 100);

            // Disable Button
            genesisBtn.innerHTML = '<i class="fas fa-check"></i> EXECUTED';
            genesisBtn.disabled = true;
            genesisBtn.style.pointerEvents = 'none';
        });
    }

    // 3. Form Transmission Logic
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Lock & Uplink
            contactForm.classList.add('sending');

            // --- SYSTEM DEFENSE TRIGGER ---
            startSystemDefense(() => {
                // Resume Transmission after Game
                resumeTransmission(statusMessage, contactForm);
            });
        });
    }

    // 4. Random Character Glitch on Nav Hover
    const links = document.querySelectorAll('.hud-link');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    links.forEach(link => {
        let interval = null;

        link.addEventListener('mouseenter', event => {
            let iteration = 0;
            const originalText = event.target.dataset.text;

            clearInterval(interval);

            interval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        });
    });

    // 5. Role Text Cycler (Decoding Effect)
    const roleElement = document.getElementById('role-text');
    if (roleElement) {
        // Updated roles list as requested
        const roles = ["AI ENGINEER", "DATA SCIENTIST", "ML ENGINEER", "ML OPS ENGINEER", "SOFTWARE ENGINEER", "AI ARCHITECT"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isGlitching = false;

        const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

        function glitchText(targetText) {
            isGlitching = true;
            let iterations = 0;
            const interval = setInterval(() => {
                roleElement.innerText = targetText
                    .split("")
                    .map((char, index) => {
                        if (index < iterations) {
                            return targetText[index];
                        }
                        return randomChars[Math.floor(Math.random() * randomChars.length)];
                    })
                    .join("");

                if (iterations >= targetText.length) {
                    clearInterval(interval);
                    isGlitching = false;
                    setTimeout(cycleRoles, 3000); // Wait before next cycle
                }

                iterations += 1 / 2;
            }, 30);
        }

        function cycleRoles() {
            roleIndex = (roleIndex + 1) % roles.length;
            glitchText(roles[roleIndex]);
        }

        // Start the cycle
        setTimeout(cycleRoles, 3000);
    }

    // 6. Ops Panel Tab Logic
    const opsTabs = document.querySelectorAll('.ops-tab');
    const opsContents = document.querySelectorAll('.ops-content');

    opsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            opsTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');

            // Hide all content
            opsContents.forEach(c => c.classList.remove('active'));

            // Show target content
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // EASTER EGG: Photo Swap Logic
            const profilePhoto = document.querySelector('.profile-photo');
            if (profilePhoto) {
                if (targetId === 'personality') {
                    // Swap to alternate photo
                    profilePhoto.src = 'maruti@umd.edu-4e92324a.jpg';
                    profilePhoto.style.transform = 'scale(1.1) rotate(5deg)';
                    setTimeout(() => {
                        profilePhoto.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                } else {
                    // Revert to original photo
                    profilePhoto.src = 'maruti@umd.edu-38d8c255.jpg';
                }
            }
        });
    });

    /* --- CYBER CURSOR LOGIC --- */
    const cursor = document.querySelector('.cyber-cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    });

    function animateFollower() {
        if (follower) {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
        }
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover Effects for Cursor
    document.querySelectorAll('a, button, .mission-card, .profile-card, .ops-tab').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('hovered');
        });
    });

    // 7. Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const hudLinks = document.querySelector('.hud-links');

    if (mobileNavToggle && hudLinks) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            hudLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.hud-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                hudLinks.classList.remove('active');
            });
        });
    }

}); // END DOM CONTENT LOADED

/* --- FUNCTIONS OUTSIDE DOM CONTENT LOADED --- */

/* --- SYSTEM DEFENSE LOGIC (LOCALIZED) --- */
function startSystemDefense(callback) {
    const section = document.querySelector('.contact-section');
    if (!section) {
        console.error("Contact section not found!");
        callback();
        return;
    }

    // Create Intro Overlay
    const intro = document.createElement('div');
    intro.classList.add('game-intro-overlay');
    intro.innerHTML = `
        <div class="intro-content">
            <div class="intro-title">⚠️ SUDDEN BUG ATTACK DETECTED ⚠️</div>
            <div class="intro-message">
                <p><strong>ALERT:</strong> Hostile bugs are corrupting your transmission!</p>
                <p>🎯 <strong>USE YOUR MOUSE TO KILL THEM!</strong></p>
                <p>⏱️ <strong>DEFENSE STARTS IN: <span id="intro-timer">5</span></strong></p>
            </div>
        </div>
    `;
    section.appendChild(intro);

    // Auto-start countdown
    let countdown = 5;
    const countdownDisplay = intro.querySelector('#intro-timer');
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdownDisplay) {
            countdownDisplay.innerText = countdown;
        }
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            intro.remove();
            startGame();
        }
    }, 1000);

    function startGame() {
        // Create Local HUD
        const hud = document.createElement('div');
        hud.classList.add('game-hud-local');
        hud.innerHTML = `
            <div class="game-message">KILL BUGS TO SAVE PACKAGE</div>
            <div class="timer">15</div>
            <div class="score">BUGS PATCHED: <span id="local-score">0</span></div>
        `;
        section.appendChild(hud);

        let score = 0;
        let timeLeft = 15;
        const timerDisplay = hud.querySelector('.timer');
        const scoreDisplay = document.getElementById('local-score');
        const gameIntervals = [];

        // Timer
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.innerText = timeLeft;
            if (timeLeft <= 0) endGame();
        }, 1000);
        gameIntervals.push(timerInterval);

        // Spawn Bugs
        const spawnInterval = setInterval(() => {
            if (section.querySelectorAll('.bug-target').length < 10) {
                spawnBug();
            }
        }, 800);
        gameIntervals.push(spawnInterval);

        function spawnBug() {
            const bug = document.createElement('div');
            bug.classList.add('bug-target');

            // Random Position within Section
            // Use offsetWidth/Height for relative positioning inside the section
            const maxX = section.offsetWidth - 50;
            const maxY = section.offsetHeight - 50;

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            bug.style.left = x + 'px';
            bug.style.top = y + 'px';

            bug.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                score++;
                scoreDisplay.innerText = score;
                createExplosion(x, y);
                bug.remove();
            });

            section.appendChild(bug);
        }

        function createExplosion(x, y) {
            const boom = document.createElement('div');
            boom.classList.add('bug-explosion');
            boom.style.left = x + 'px';
            boom.style.top = y + 'px';
            section.appendChild(boom);
            setTimeout(() => boom.remove(), 300);
        }

        function endGame() {
            gameIntervals.forEach(clearInterval);

            // Cleanup Bugs
            section.querySelectorAll('.bug-target').forEach(b => b.remove());

            // Show Success Message in HUD
            hud.innerHTML = `<div style="color:var(--accent); font-weight:bold; font-size:1.2rem">SYSTEM SECURED<br>BUGS REMOVED: ${score}</div>`;

            setTimeout(() => {
                hud.remove();
                callback();
            }, 2000);
        }
    }
}

function resumeTransmission(statusMessage, contactForm) {
    statusMessage.innerHTML = `
            <div class="terminal-text">> PACKET_ENCRYPTING...</div>
            <div class="status-bar"><div class="status-bar-fill"></div></div>
        `;
    statusMessage.classList.add('active');
    statusMessage.classList.remove('success'); // Reset state

    const barFill = statusMessage.querySelector('.status-bar-fill');

    // 2. Progress Animation
    setTimeout(() => {
        if (barFill) barFill.style.width = '30%';
    }, 100);

    setTimeout(() => {
        statusMessage.querySelector('.terminal-text').innerText = "> UPLOADING_TO_SERVER...";
        if (barFill) barFill.style.width = '70%';
    }, 1000);

    // 3. AJAX Submission
    const formData = new FormData(contactForm);

    fetch("https://formsubmit.co/ajax/marutikameshwar1@gmail.com", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (barFill) barFill.style.width = '100%';

            setTimeout(() => {
                statusMessage.classList.add('success');
                statusMessage.querySelector('.terminal-text').innerText = "> TRANSMISSION_COMPLETE.";
                // console.log('Success:', data);
            }, 500);

            // Reset & Slide Down
            setTimeout(() => {
                statusMessage.classList.remove('active');
                contactForm.classList.remove('sending');
                contactForm.classList.add('in-anim');
                contactForm.reset();

                setTimeout(() => {
                    contactForm.classList.remove('in-anim');
                }, 500);
            }, 3500);
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.querySelector('.terminal-text').innerText = "> TRANSMISSION_FAILED // RETRY";
            statusMessage.classList.add('error'); // distinct style for error if needed

            setTimeout(() => {
                statusMessage.classList.remove('active');
                contactForm.classList.remove('sending');
            }, 3000);
        });
}

/* --- RESUME DOWNLOAD LOGIC --- */
function initiateDownload(btn) {
    const originalText = btn.querySelector('.text').innerText;
    const icon = btn.querySelector('.icon');

    // 0. Scroll to Transmission Section
    const transmissionSection = document.getElementById('transmission');
    if (transmissionSection) {
        transmissionSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 1. Change State to Downloading
    btn.classList.add('downloading');
    btn.querySelector('.text').innerText = "ESTABLISHING_CONNECTION...";
    icon.className = "fas fa-circle-notch fa-spin icon";

    // 2. Simulate Data Stream (Delay)
    setTimeout(() => {
        // btn.querySelector('.text').innerText = "DOWNLOADING_PACKET...";
        // Glitch text effect could go here
    }, 1000);

    // 3. Trigger Download & Reset
    setTimeout(() => {
        // Create dummy link to trigger download
        const link = document.createElement('a');
        link.href = 'Maruti_kameshwar_Modali.pdf'; // Updated to new resume
        link.download = 'Maruti_Kameshwar_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset UI
        btn.classList.remove('downloading');
        btn.querySelector('.text').innerText = "TRANSMISSION_COMPLETE";
        icon.className = "fas fa-check icon";

        setTimeout(() => {
            btn.querySelector('.text').innerText = originalText;
            icon.className = "fas fa-file-download icon";
        }, 3000);
    }, 2500);
}
