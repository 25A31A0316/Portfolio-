/**
 * Behara Prasanth Kumar - Mechanical Engineering Portfolio Script
 * Handles typing effect, interactive filters, project modals, theme toggles, and forms
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Initialize features
  initThemeToggle();
  initTypewriter();
  initNavbarScroll();
  initMobileMenu();
  initSkillsFilter();
  initCopyEmail();
  initCopyPhone();
  initBackToTop();
  initActiveNavOnScroll();
  initMechanicalWorkbench();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('bpk_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('bpk_theme', nextTheme);

      // Re-trigger icon render
      if (window.lucide) {
        lucide.createIcons();
      }

      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Blueprint mode`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Typing Effect in Hero Section
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const words = [
    'AutoCAD & CATIA 3D Modeling',
    'Mechanical Product Design',
    'Material Science & Manufacturing',
    'Precision 2D Drafting & Assemblies'
  ];
  const target = document.getElementById('typewriter');
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseEnd = 1900;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Sticky Navbar with Blur on Scroll
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const getInTouchBtn = document.getElementById('nav-get-in-touch');
  if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('name');
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Active Nav Highlighting on Scroll
   -------------------------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. Skills Filter Tabs (CAD, Manufacturing, Core)
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Copy Email Address to Clipboard
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('Email address copied to clipboard!');
        })
        .catch(() => {
          showToast('Failed to copy. Email: ' + email);
        });
    });
  }
}

/* --------------------------------------------------------------------------
   7b. Copy Phone Number to Clipboard
   -------------------------------------------------------------------------- */
function initCopyPhone() {
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const phoneText = document.getElementById('phone-text');

  if (copyPhoneBtn && phoneText) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = phoneText.textContent.trim();
      navigator.clipboard.writeText(phone)
        .then(() => {
          showToast('Phone number (+91 99594 79127) copied to clipboard!');
        })
        .catch(() => {
          showToast('Failed to copy phone: ' + phone);
        });
    });
  }
}

/* --------------------------------------------------------------------------
   8. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   9. Project Modal Details
   -------------------------------------------------------------------------- */
function showProjectDetails(title, description, tags, repoUrl) {
  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('modal-project-title');
  const descEl = document.getElementById('modal-project-desc');
  const tagsEl = document.getElementById('modal-tags');
  const repoLink = document.getElementById('modal-repo-link');

  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = description;
  if (repoLink) {
    repoLink.href = repoUrl || 'https://github.com/25A31A0316';
  }

  if (tagsEl && tags) {
    tagsEl.innerHTML = '';
    tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      tagsEl.appendChild(span);
    });
  }

  if (modal) {
    modal.classList.add('open');
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
  }
}

// Close modal when clicking outside of dialog
window.addEventListener('click', (e) => {
  const projectModal = document.getElementById('project-modal');
  const resumeModal = document.getElementById('resume-modal');

  if (e.target === projectModal) {
    closeProjectModal();
  }
  if (e.target === resumeModal) {
    closeResumeModal();
  }
});

/* --------------------------------------------------------------------------
   10. Resume Modal & Print
   -------------------------------------------------------------------------- */
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('open');
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function printResume() {
  window.print();
}

const resumeDownloadBtn = document.getElementById('resume-download-btn');
if (resumeDownloadBtn) {
  resumeDownloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openResumeModal();
  });
}

/* --------------------------------------------------------------------------
   11. Contact Form Submit Handling
   -------------------------------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const subject = form.querySelector('#subject').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill out all required fields.');
    return;
  }

  const submitBtn = document.getElementById('submit-btn');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending message...</span>';

  // Simulate submission feedback
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    form.reset();

    showToast(`Thank you, ${name}! Your inquiry has been sent to Behara Prasanth Kumar.`);
    if (window.lucide) {
      lucide.createIcons();
    }
  }, 1000);
}

/* --------------------------------------------------------------------------
   12. Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="check-circle" style="color: #38bdf8; width: 18px; height: 18px;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  if (window.lucide) {
    lucide.createIcons();
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   13. Interactive Mechanical CAD Kinematics Workbench Engine
   -------------------------------------------------------------------------- */
function initMechanicalWorkbench() {
  const canvas = document.getElementById('mechanical-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const rpmSlider = document.getElementById('rpm-slider');
  const pauseBtn = document.getElementById('mech-pause-btn');
  const reverseBtn = document.getElementById('mech-reverse-btn');
  const dimensionBtn = document.getElementById('mech-dimension-btn');
  const hudRpm = document.getElementById('hud-rpm');
  const hudRatio = document.getElementById('hud-ratio');
  const hudTorque = document.getElementById('hud-torque');
  const tabs = document.querySelectorAll('.workbench-tab');
  const specSheetView = document.getElementById('spec-sheet-view');
  const cadWatermark = document.getElementById('cad-watermark');

  let currentMode = 'gears'; // 'gears', 'piston', 'spec'
  let rpm = 120;
  let isPaused = false;
  let direction = 1;
  let showDimensions = true;
  let angle = 0;
  let lastTime = performance.now();

  // Set internal canvas resolution to match CSS width and devicePixelRatio
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 440;
    const height = rect.height || 240;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Tabs switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentMode = tab.getAttribute('data-tab');

      if (currentMode === 'spec') {
        canvas.style.display = 'none';
        specSheetView.classList.add('active');
        if (cadWatermark) cadWatermark.textContent = 'ISO 128 / ASME Y14.5 • PARAMETRIC SPEC SHEET';
        if (hudRpm) hudRpm.textContent = 'STATIC SPEC';
        if (hudRatio) hudRatio.textContent = '1:2.0 REDUCT.';
        if (hudTorque) hudTorque.textContent = '45.0 N·m';
      } else {
        canvas.style.display = 'block';
        specSheetView.classList.remove('active');
        resizeCanvas();

        if (currentMode === 'gears') {
          if (cadWatermark) cadWatermark.textContent = 'CATIA V5 / ASME Y14.5 • REAL-TIME KINEMATICS';
          if (hudRpm) hudRpm.textContent = `${rpm} RPM`;
          if (hudRatio) hudRatio.textContent = '1:2.00 REDUCT.';
          if (hudTorque) hudTorque.textContent = '45.0 N·m';
        } else if (currentMode === 'piston') {
          if (cadWatermark) cadWatermark.textContent = 'SLIDER-CRANK KINEMATICS • TDC / BDC DYNAMICS';
          if (hudRpm) hudRpm.textContent = `${rpm} RPM`;
          if (hudRatio) hudRatio.textContent = 'STROKE: 70mm';
          const linearVel = ((2 * Math.PI * (rpm / 60) * 0.035) * (2 / Math.PI)).toFixed(2);
          if (hudTorque) hudTorque.textContent = `V_avg: ${linearVel} m/s`;
        }
      }
    });
  });

  // Controls
  if (rpmSlider) {
    rpmSlider.addEventListener('input', (e) => {
      rpm = parseInt(e.target.value, 10);
      if (currentMode === 'gears' && hudRpm) {
        hudRpm.textContent = `${rpm} RPM`;
      } else if (currentMode === 'piston') {
        if (hudRpm) hudRpm.textContent = `${rpm} RPM`;
        const linearVel = ((2 * Math.PI * (rpm / 60) * 0.035) * (2 / Math.PI)).toFixed(2);
        if (hudTorque) hudTorque.textContent = `V_avg: ${linearVel} m/s`;
      }
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.classList.toggle('active', !isPaused);
      pauseBtn.innerHTML = isPaused ? '<i data-lucide="play"></i>' : '<i data-lucide="pause"></i>';
      if (window.lucide) lucide.createIcons();
    });
  }

  if (reverseBtn) {
    reverseBtn.addEventListener('click', () => {
      direction = -direction;
      reverseBtn.classList.toggle('active');
    });
  }

  if (dimensionBtn) {
    dimensionBtn.addEventListener('click', () => {
      showDimensions = !showDimensions;
      dimensionBtn.classList.toggle('active', showDimensions);
    });
  }

  // Engineering drawing helpers
  function drawGrid(w, h) {
    ctx.fillStyle = '#08101e';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
    ctx.lineWidth = 1;
    const gridStep = 20;

    ctx.beginPath();
    for (let x = 0; x < w; x += gridStep) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += gridStep) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  function drawCenterMark(cx, cy, size = 8) {
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx - size, cy);
    ctx.lineTo(cx + size, cy);
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx, cy + size);
    ctx.stroke();
    ctx.restore();
  }

  function drawDimensionLine(x1, y1, x2, y2, text, offset = 18) {
    ctx.save();
    ctx.strokeStyle = '#38bdf8';
    ctx.fillStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Leader lines
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y1 + offset);
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2, y2 + offset);
    ctx.stroke();

    const dy = y1 + offset - 4;
    // Dimension line with arrowheads
    ctx.beginPath();
    ctx.moveTo(x1 + 6, dy);
    ctx.lineTo(x2 - 6, dy);
    ctx.stroke();

    // Arrows
    ctx.beginPath();
    ctx.moveTo(x1, dy);
    ctx.lineTo(x1 + 6, dy - 3);
    ctx.lineTo(x1 + 6, dy + 3);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x2, dy);
    ctx.lineTo(x2 - 6, dy - 3);
    ctx.lineTo(x2 - 6, dy + 3);
    ctx.closePath();
    ctx.fill();

    // Text box
    const midX = (x1 + x2) / 2;
    ctx.fillStyle = '#08101e';
    const textWidth = ctx.measureText(text).width;
    ctx.fillRect(midX - textWidth / 2 - 4, dy - 6, textWidth + 8, 12);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText(text, midX, dy);
    ctx.restore();
  }

  function drawInvoluteGear(cx, cy, teeth, pitchRadius, outerRadius, rootRadius, rotAngle, color, spokes = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotAngle);

    // Draw teeth
    const step = (Math.PI * 2) / teeth;
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const a = i * step;
      const aRoot1 = a;
      const aPitch1 = a + step * 0.18;
      const aTip1 = a + step * 0.28;
      const aTip2 = a + step * 0.44;
      const aPitch2 = a + step * 0.54;
      const aRoot2 = a + step * 0.72;

      const r1x = rootRadius * Math.cos(aRoot1);
      const r1y = rootRadius * Math.sin(aRoot1);
      const p1x = pitchRadius * Math.cos(aPitch1);
      const p1y = pitchRadius * Math.sin(aPitch1);
      const t1x = outerRadius * Math.cos(aTip1);
      const t1y = outerRadius * Math.sin(aTip1);
      const t2x = outerRadius * Math.cos(aTip2);
      const t2y = outerRadius * Math.sin(aTip2);
      const p2x = pitchRadius * Math.cos(aPitch2);
      const p2y = pitchRadius * Math.sin(aPitch2);
      const r2x = rootRadius * Math.cos(aRoot2);
      const r2y = rootRadius * Math.sin(aRoot2);

      if (i === 0) {
        ctx.moveTo(r1x, r1y);
      } else {
        ctx.lineTo(r1x, r1y);
      }
      ctx.lineTo(p1x, p1y);
      ctx.lineTo(t1x, t1y);
      ctx.lineTo(t2x, t2y);
      ctx.lineTo(p2x, p2y);
      ctx.lineTo(r2x, r2y);
    }
    ctx.closePath();

    ctx.fillStyle = 'rgba(14, 30, 52, 0.9)';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Spokes or cutouts on large gear
    if (spokes > 0) {
      const spokeRadius = pitchRadius * 0.58;
      const holeRadius = pitchRadius * 0.18;
      for (let s = 0; s < spokes; s++) {
        const sa = (s * Math.PI * 2) / spokes;
        const hx = spokeRadius * Math.cos(sa);
        const hy = spokeRadius * Math.sin(sa);
        ctx.beginPath();
        ctx.arc(hx, hy, holeRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#08101e';
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Hub and bore
    const hubRadius = pitchRadius * 0.32;
    const boreRadius = pitchRadius * 0.16;

    ctx.beginPath();
    ctx.arc(0, 0, hubRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Shaft bore with keyway
    ctx.beginPath();
    ctx.arc(0, 0, boreRadius, 0, Math.PI * 2);
    ctx.rect(-boreRadius * 0.3, -boreRadius * 1.35, boreRadius * 0.6, boreRadius * 0.7);
    ctx.fillStyle = '#08101e';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();

    // Pitch Circle overlay (static orientation)
    if (showDimensions) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, pitchRadius, 0, Math.PI * 2);
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      drawCenterMark(cx, cy, pitchRadius * 0.35);
      ctx.restore();
    }
  }

  // Animation Loop
  function render(time) {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    if (!isPaused && dt < 0.2) {
      angle += (rpm * 2 * Math.PI / 60) * dt * direction;
    }

    if (currentMode !== 'spec') {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 440;
      const h = rect.height || 240;

      drawGrid(w, h);

      if (currentMode === 'gears') {
        const scale = w / 440;
        const cy = h / 2 - 12;
        const r1 = 38 * scale;
        const r2 = 76 * scale;
        const cx1 = 135 * scale;
        const cx2 = cx1 + r1 + r2; // pitch tangency
        const t1 = 14;
        const t2 = 28;

        const a1 = angle;
        // Engage teeth with proper pitch point contact phase
        const a2 = -angle * (t1 / t2) + (Math.PI / t2);

        // Draw gears
        drawInvoluteGear(cx1, cy, t1, r1, r1 + 8 * scale, r1 - 7 * scale, a1, '#38bdf8', 0);
        drawInvoluteGear(cx2, cy, t2, r2, r2 + 8 * scale, r2 - 7 * scale, a2, '#60a5fa', 4);

        if (showDimensions) {
          // Pitch point marker
          ctx.beginPath();
          ctx.arc(cx1 + r1, cy, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();

          // Center distance dimension line
          drawDimensionLine(cx1, cy, cx2, cy, 'PCD a = 105.0 mm', 90 * scale);

          // Labels
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
          ctx.textAlign = 'center';
          ctx.fillText('PINION (Z₁=14T)', cx1, cy - r1 - 14 * scale);
          ctx.fillText('GEAR (Z₂=28T)', cx2, cy - r2 - 14 * scale);
        }
      } else if (currentMode === 'piston') {
        const scale = w / 440;
        const cy = h / 2;
        const cx = 95 * scale;
        const r = 36 * scale; // crank radius
        const L = 125 * scale; // rod length

        const theta = angle;
        const px = cx + r * Math.cos(theta);
        const py = cy + r * Math.sin(theta);

        // Slider-crank kinematics
        const pistonX = px + Math.sqrt(L * L - Math.pow(py - cy, 2));

        // Cylinder walls
        const cylTop = cy - 24 * scale;
        const cylBottom = cy + 24 * scale;
        const cylStart = 165 * scale;
        const cylEnd = 390 * scale;

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cylStart, cylTop);
        ctx.lineTo(cylEnd, cylTop);
        ctx.moveTo(cylStart, cylBottom);
        ctx.lineTo(cylEnd, cylBottom);
        ctx.stroke();

        // Hatched lines on cylinder walls
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = cylStart; x < cylEnd; x += 12 * scale) {
          ctx.moveTo(x, cylTop);
          ctx.lineTo(x + 6 * scale, cylTop - 8 * scale);
          ctx.moveTo(x, cylBottom);
          ctx.lineTo(x + 6 * scale, cylBottom + 8 * scale);
        }
        ctx.stroke();

        // TDC & BDC guide lines
        const xTDC = cx + r + L;
        const xBDC = cx - r + L;

        if (showDimensions) {
          ctx.save();
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(xTDC, cylTop - 12);
          ctx.lineTo(xTDC, cylBottom + 12);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.beginPath();
          ctx.moveTo(xBDC, cylTop - 12);
          ctx.lineTo(xBDC, cylBottom + 12);
          ctx.stroke();

          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = '#ef4444';
          ctx.fillText('TDC', xTDC, cylTop - 16);
          ctx.fillStyle = '#38bdf8';
          ctx.fillText('BDC', xBDC, cylTop - 16);
          ctx.restore();
        }

        // Crank wheel / flywheel disk
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Crank arm / counterweight
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 7 * scale;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();

        // Connecting Rod (I-Beam style)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(pistonX, cy);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 5 * scale;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Big end bearing & wrist pin
        ctx.beginPath();
        ctx.arc(px, py, 6 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pistonX, cy, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Reciprocating Piston
        const pw = 48 * scale;
        const ph = 36 * scale;
        const pLeft = pistonX - pw / 2;
        const pTop = cy - ph / 2;

        ctx.fillStyle = 'rgba(30, 41, 59, 0.95)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rect(pLeft, pTop, pw, ph);
        ctx.fill();
        ctx.stroke();

        // Piston rings (compression & oil scraper grooves)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pLeft + 8 * scale, pTop + 6 * scale);
        ctx.lineTo(pLeft + pw - 8 * scale, pTop + 6 * scale);
        ctx.moveTo(pLeft + 8 * scale, pTop + 14 * scale);
        ctx.lineTo(pLeft + pw - 8 * scale, pTop + 14 * scale);
        ctx.moveTo(pLeft + 8 * scale, pTop + 22 * scale);
        ctx.lineTo(pLeft + pw - 8 * scale, pTop + 22 * scale);
        ctx.stroke();

        // Dimensions
        if (showDimensions) {
          drawDimensionLine(xBDC, cylBottom + 4, xTDC, cylBottom + 4, 'Stroke S = 70 mm', 16 * scale);
          drawCenterMark(cx, cy, 18 * scale);
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
