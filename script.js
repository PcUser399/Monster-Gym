const hero = document.querySelector(".hero");
const heroVideo = document.querySelector(".hero-video");

if (hero && heroVideo) {
  const markVideoReady = () => {
    hero.classList.add("video-ready");
    hero.classList.remove("video-missing");
  };

  const markVideoMissing = () => {
    if (!hero.classList.contains("video-ready")) {
      hero.classList.add("video-missing");
    }
  };

  heroVideo.addEventListener("canplay", markVideoReady, { once: true });
  heroVideo.addEventListener("error", markVideoMissing);

  for (const source of heroVideo.querySelectorAll("source")) {
    source.addEventListener("error", markVideoMissing);
  }

  heroVideo.play().catch(markVideoMissing);
}

// --- Scroll Entrance Reveal (IntersectionObserver) ---
const animatedElements = document.querySelectorAll(".animate-on-scroll");
if ("IntersectionObserver" in window && animatedElements.length > 0) {
  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: "0px"
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    scrollObserver.observe(element);
  });
} else {
  // Fallback if browser doesn't support IntersectionObserver
  animatedElements.forEach(element => {
    element.classList.add("in-view");
  });
}

// --- Dynamic Particle Generator ---
const particlesContainer = document.querySelector(".particles-container");
if (particlesContainer) {
  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    const size = Math.random() * 3.5 + 1.5; // 1.5px to 5px
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 14 + 10; // 10s to 24s
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// --- Premium 3D Mouse Tilt Interaction ---
const isHoverSupported = window.matchMedia("(hover: hover)").matches;
if (isHoverSupported) {
  const tiltWrappers = document.querySelectorAll(".program-card-wrapper");
  tiltWrappers.forEach(wrapper => {
    wrapper.addEventListener("mousemove", e => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angle (max 7 degrees for premium, subtle movement)
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      // Get stagger offset if screen is larger than mobile (640px)
      let stagger = 0;
      if (window.innerWidth > 640) {
        stagger = parseFloat(wrapper.getAttribute("data-stagger") || "0");
      }
      
      wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025) translateY(${stagger - 8}px)`;
    });
    
    wrapper.addEventListener("mouseleave", () => {
      let stagger = 0;
      if (window.innerWidth > 640) {
        stagger = parseFloat(wrapper.getAttribute("data-stagger") || "0");
      }
      wrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(${stagger}px)`;
    });
  });
}

// ==========================================================================
// PROGRAMS DESTINATION DATA, ROUTING, AND TEMPLATES
// ==========================================================================

const PROGRAMS_DATA = {
  boxing: {
    title: "Boxing",
    tag: "PROGRAM 01 / STRIKE",
    statement: "Precision. Speed. Composure.",
    subtext: "Master the sweet science. Learn clean punching mechanics, rhythmic head movement, ring control, and conditioning built for the 12th round.",
    stats: {
      skill: "Striking Mechanics",
      conditioning: "Aerobic Capacity",
      intensity: "High Speed",
      focus: "Accuracy & Timing"
    },
    why: [
      {
        title: "Precision Striking",
        desc: "Learn to transfer weight from the ground up, delivering maximum force with perfect alignment.",
        icon: "&#129354;"
      },
      {
        title: "Defensive Composure",
        desc: "Build muscle memory for slips, rolls, and parries. Move comfortably under pressure.",
        icon: "&#128737;"
      },
      {
        title: "Combat Conditioning",
        desc: "Build fight-specific endurance using heavy bag rounds, pad work, and agility drills.",
        icon: "&#9889;"
      }
    ],
    train: [
      { title: "Punch Mechanics", desc: "Developing power, speed, and safety in jabs, crosses, hooks, and uppercuts." },
      { title: "Footwork & Angles", desc: "Pivoting, cutting the ring, and maintaining perfect balance while striking." },
      { title: "Slipping & Rolling", desc: "Avoiding punches by inches, staying ready to counter-attack instantly." },
      { title: "Heavy Bag Work", desc: "Building power, structural alignment, and sustained physical output." }
    ],
    ideal: [
      { title: "Skill Seekers", desc: "Anyone wanting to learn real combat mechanics without the ego." },
      { title: "Conditioning Focus", desc: "Individuals looking to burn calories and build real athletic speed." }
    ],
    experience: {
      title: "Focused & Composed",
      desc: "Boxing at Monster Gym is about brain and precision, not just throwing hooks. Classes are structured, coach-led, and run in an ego-free environment where safety and technique come first."
    },
    schedule: [
      { day: "Monday / Wednesday", times: "07:00 Early / 18:30 Evening" },
      { day: "Friday", times: "18:30 Sparring Lab" },
      { day: "Saturday", times: "10:00 Open Ring Rounds" }
    ]
  },
  kickboxing: {
    title: "Kickboxing",
    tag: "PROGRAM 02 / POWER",
    statement: "Relentless. Explosive. Full-Body.",
    subtext: "Blend Western boxing with dynamic kicking styles. Build relentless high-intensity cardio, power combinations, and sharp reflexes.",
    stats: {
      skill: "8-Point Striking",
      conditioning: "Anaerobic Power",
      intensity: "Maximum Output",
      focus: "Combinations"
    },
    why: [
      {
        title: "8-Point Weapons",
        desc: "Unleash punches, kicks, knees, and elbows. Develop full-body coordination and timing.",
        icon: "&#128293;"
      },
      {
        title: "Relentless Cardio",
        desc: "High-power intervals that push your heart rate and build explosive physical recovery.",
        icon: "&#129505;"
      },
      {
        title: "Rhythm & Coordination",
        desc: "Learn to chain punches into heavy low kicks and high kicks fluidly.",
        icon: "&#127926;"
      }
    ],
    train: [
      { title: "Kicking Dynamics", desc: "Mastering roundhouse kicks, teeps, and front kicks with speed and leverage." },
      { title: "Punch-Kick Chains", desc: "Chaining boxing combinations with heavy leg strikes seamlessly." },
      { title: "Reflex & Pad Drill", desc: "Sharpening reaction times and defensive guards using focus mitts and Thai pads." },
      { title: "Core & Stamina", desc: "Building lower body power, rotational core stability, and intense recovery." }
    ],
    ideal: [
      { title: "High-Energy Trainees", desc: "People seeking a massive sweat combined with highly technical striking skills." },
      { title: "Explosive Athletes", desc: "Martial artists wanting to add leg coordination and distance control to their game." }
    ],
    experience: {
      title: "Relentless Energy",
      desc: "Kickboxing classes are high-tempo and kinetic. You will sweat, kick pads, throw combinations, and learn distance control in a supportive and high-vibe group setting led by active fighters."
    },
    schedule: [
      { day: "Monday / Wednesday", times: "19:30 Evening Strike" },
      { day: "Tuesday / Thursday", times: "07:00 Early Kick / 19:00 Evening" },
      { day: "Saturday", times: "11:00 Pad Work Clinic" }
    ]
  },
  grappling: {
    title: "Grappling",
    tag: "PROGRAM 03 / CONTROL",
    statement: "Leverage. Intelligence. Mastery.",
    subtext: "Learn submission grappling and wrestling. Control larger opponents using body position, mechanics, and mental composure under pressure.",
    stats: {
      skill: "Position Control",
      conditioning: "Isometric Strength",
      intensity: "Controlled Pace",
      focus: "Mental Composure"
    },
    why: [
      {
        title: "Leverage over Force",
        desc: "Learn to use skeletal structure and gravity to control weight, making strength secondary.",
        icon: "&#128504;"
      },
      {
        title: "Mat Intelligence",
        desc: "Treat the mat like a chess game. Read traps, control positions, and execute submissions.",
        icon: "&#129504;"
      },
      {
        title: "Pressure Testing",
        desc: "Build absolute composure in difficult situations, learning to breath and think under load.",
        icon: "&#9994;"
      }
    ],
    train: [
      { title: "Guard & Takedowns", desc: "Learning double-legs, clinch work, and sweeping from the guard position." },
      { title: "Positional Hierarchy", desc: "Securing mount, side control, and back control to nullify threats." },
      { title: "Escapes & Reversals", desc: "Wriggling out of pinning positions and reversing bad situations safely." },
      { title: "Joint Locks & Chokes", desc: "Executing submissions with control and absolute respect for your partner." }
    ],
    ideal: [
      { title: "Tacticians", desc: "People who love mental problem-solving, leverage physics, and close combat." },
      { title: "Functional Wrestlers", desc: "Martial artists looking to build elite ground control and submission defense." }
    ],
    experience: {
      title: "Cerebral & Coached",
      desc: "Our grappling floor is a laboratory. Classes focus on slow, step-by-step technical drilling, followed by structured situational sparring where you apply logic, breathing, positioning to solve problems."
    },
    schedule: [
      { day: "Tuesday / Thursday", times: "19:00 Submission Wrestling" },
      { day: "Friday", times: "19:30 Positional Drilling" },
      { day: "Saturday", times: "10:00 Open Mat Flow" }
    ]
  },
  strength: {
    title: "Strength",
    tag: "PROGRAM 04 / FORCE",
    statement: "Power. Resilience. Progression.",
    subtext: "Build functional strength and athletic capacity. Focus on compound lifts, core stability, and bulletproofing your joints for life and combat.",
    stats: {
      skill: "Barbell & Kettlebell",
      conditioning: "Power Endurance",
      intensity: "Heavy Force",
      focus: "Progressive Load"
    },
    why: [
      {
        title: "Compound Power",
        desc: "Focus on deadlifts, squats, and presses. Build a solid physical armor that carries over everywhere.",
        icon: "&#127947;"
      },
      {
        title: "Joint Resilience",
        desc: "Bulletproof your knees, shoulders, and back to stay injury-free in training and life.",
        icon: "&#128170;"
      },
      {
        title: "Progressive Overload",
        desc: "Track every lift. Make consistent, calculated gains under coach supervision.",
        icon: "&#128200;"
      }
    ],
    train: [
      { title: "Barbell Lifts", desc: "Refining squats, deadlifts, and bench presses with safe, optimal technique." },
      { title: "Kettlebell Ballistics", desc: "Building explosive hips, rotational power, and grip endurance with swings." },
      { title: "Mobility & Flow", desc: "Opening up tight hips and shoulders to allow deep, safe ranges of movement." },
      { title: "Core Stiffening", desc: "Developing heavy anti-rotational core strength to shield the spine under load." }
    ],
    ideal: [
      { title: "Strength Builders", desc: "Anyone wanting to lift safely, correct bad postures, and pack on physical armor." },
      { title: "Combat Athletes", desc: "Fighters seeking to add explosive power and physical resilience to their game." }
    ],
    experience: {
      title: "Structured & Progressive",
      desc: "There are no random workouts here. Strength training at Monster Gym is structured in blocks, tracked carefully, and coached with a heavy emphasis on form, breathing, and safe progression."
    },
    schedule: [
      { day: "Mon / Wed / Fri", times: "06:30 Early Strength / 12:00 Lunch / 17:30 Evening" },
      { day: "Tuesday / Thursday", times: "06:30 Kettlebell Flow / 18:00 Athletic Power" },
      { day: "Saturday", times: "09:00 Heavy Lifting Lab" }
    ]
  }
};

const transitionOverlay = document.getElementById("transition-overlay");
const overlayTitle = transitionOverlay ? transitionOverlay.querySelector(".overlay-title") : null;
const programView = document.getElementById("program-view");

const openProgramPage = (programKey, instant = false) => {
  const data = PROGRAMS_DATA[programKey];
  if (!data) return;

  if (instant) {
    renderProgramPage(programKey);
    document.body.classList.add("in-program-view");
    window.scrollTo({ top: 0 });
    return;
  }

  // Set overlay title
  if (overlayTitle) overlayTitle.textContent = data.title.toUpperCase();

  // Trigger panels and scanline reveal
  if (transitionOverlay) {
    transitionOverlay.className = `transition-active theme-${programKey}`;
    transitionOverlay.setAttribute("aria-hidden", "false");
  }

  // Swap pages midway when screen is fully covered
  setTimeout(() => {
    renderProgramPage(programKey);
    document.body.classList.add("in-program-view");
    window.scrollTo({ top: 0 });
  }, 500);

  // Transition panels out
  setTimeout(() => {
    if (transitionOverlay) transitionOverlay.className = `transition-out theme-${programKey}`;
  }, 1000);

  // Reset overlay to idle
  setTimeout(() => {
    if (transitionOverlay) {
      transitionOverlay.className = "transition-idle";
      transitionOverlay.setAttribute("aria-hidden", "true");
    }
  }, 1600);
};

const closeProgramPage = (instant = false) => {
  if (instant) {
    document.body.classList.remove("in-program-view");
    window.scrollTo({ top: 0 });
    return;
  }

  if (overlayTitle) overlayTitle.textContent = "ARENA SELECTOR";
  if (transitionOverlay) {
    transitionOverlay.className = "transition-active";
    transitionOverlay.setAttribute("aria-hidden", "false");
  }

  setTimeout(() => {
    document.body.classList.remove("in-program-view");
    const targetSection = document.getElementById("programs");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, 500);

  setTimeout(() => {
    if (transitionOverlay) transitionOverlay.className = "transition-out";
  }, 1000);

  setTimeout(() => {
    if (transitionOverlay) {
      transitionOverlay.className = "transition-idle";
      transitionOverlay.setAttribute("aria-hidden", "true");
    }
  }, 1600);
};

const renderProgramPage = (programKey) => {
  const data = PROGRAMS_DATA[programKey];
  if (!data) return;

  const statsHtml = `
    <div class="program-stats-strip reveal-element">
      <div class="stat-box">
        <span class="stat-label">SKILL</span>
        <span class="stat-value">${data.stats.skill}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">CONDITIONING</span>
        <span class="stat-value">${data.stats.conditioning}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">INTENSITY</span>
        <span class="stat-value">${data.stats.intensity}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">FOCUS</span>
        <span class="stat-value">${data.stats.focus}</span>
      </div>
    </div>
  `;

  const whyHtml = data.why.map(item => `
    <div class="why-card">
      <div class="why-card-icon">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');

  const trainHtml = data.train.map(item => `
    <div class="train-item">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');

  const idealHtml = data.ideal.map(item => `
    <div class="ideal-item">
      <div class="ideal-item-bullet"></div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');

  const scheduleHtml = data.schedule.map(item => `
    <div class="schedule-preview-row">
      <span>${item.day}</span>
      <span>${item.times}</span>
    </div>
  `).join('');

  const pageHtml = `
    <div class="program-page-container theme-${programKey}">
      <!-- Hero Section -->
      <header class="program-hero">
        <div class="hero-bg-effect"></div>
        <div class="hero-content-wrapper">
          <div class="program-meta-tag">${data.tag}</div>
          <h1 class="program-hero-title">${data.title}</h1>
          <p class="program-hero-statement">${data.statement}</p>
          <p class="program-hero-subtext">${data.subtext}</p>
          <div class="program-hero-actions">
            <button class="button primary cta-booking-btn">Book a Trial</button>
            <a href="#schedule" class="button secondary">View Schedule</a>
          </div>
        </div>
        ${statsHtml}
      </header>

      <!-- Why This Program -->
      <section class="program-why">
        <div class="section-kicker">WHY THIS PROGRAM ///</div>
        <h2 class="section-title">THE STANDARD OF TRAINING</h2>
        <div class="why-grid reveal-element reveal-stagger">
          ${whyHtml}
        </div>
      </section>

      <!-- What You'll Train -->
      <section class="program-train">
        <div class="section-kicker">WHAT YOU'LL TRAIN ///</div>
        <h2 class="section-title">CURRICULUM BREAKDOWN</h2>
        <div class="train-list reveal-element reveal-stagger">
          ${trainHtml}
        </div>
      </section>

      <!-- Ideal For & Experience (Split) -->
      <section class="program-split">
        <div class="split-column ideal-column reveal-element">
          <div class="section-kicker">SUITABLE FOR ///</div>
          <h2 class="section-title">IDEAL FOR</h2>
          <div class="ideal-list">
            ${idealHtml}
          </div>
        </div>
        
        <div class="split-column experience-column reveal-element">
          <div class="section-kicker">CULTURE ///</div>
          <h2 class="section-title">TRAINING EXPERIENCE</h2>
          <div class="experience-card">
            <h3>${data.experience.title}</h3>
            <p>${data.experience.desc}</p>
          </div>
        </div>
      </section>

      <!-- Schedule Preview -->
      <section class="program-schedule" id="schedule">
        <div class="section-kicker">AVAILABILITY ///</div>
        <h2 class="section-title">WEEKLY SCHEDULE</h2>
        <div class="schedule-preview-box reveal-element">
          <div class="schedule-preview-row header">
            <span>TRAINING DAY</span>
            <span>CLASS TIME</span>
          </div>
          ${scheduleHtml}
        </div>
      </section>

      <!-- Bottom Nav / Switcher / CTA -->
      <footer class="program-cta-footer">
        <div class="footer-cta-content reveal-element">
          <h2>READY TO BEGIN?</h2>
          <p>Schedule your free coached trial session and meet the team.</p>
          <button class="button primary cta-booking-btn">Book a Trial Session</button>
        </div>
        
        <!-- Program Switcher -->
        <div class="program-switcher-wrap reveal-element">
          <span class="switcher-label">CHOOSE ANOTHER DISCIPLINE</span>
          <div class="switcher-links">
            <button data-switch="boxing" class="switch-btn">BOXING</button>
            <button data-switch="kickboxing" class="switch-btn">KICKBOXING</button>
            <button data-switch="grappling" class="switch-btn">GRAPPLING</button>
            <button data-switch="strength" class="switch-btn">STRENGTH</button>
          </div>
        </div>

        <!-- Back to home link -->
        <div class="back-home-wrap reveal-element">
          <button class="back-home-btn">&larr; BACK TO ARENA</button>
        </div>
      </footer>
    </div>
  `;

  if (programView) {
    programView.innerHTML = pageHtml;
    programView.setAttribute("aria-hidden", "false");

    // Wire switcher controls
    const switchBtns = programView.querySelectorAll(".switch-btn");
    switchBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const switchKey = btn.getAttribute("data-switch");
        window.location.hash = switchKey;
      });
    });

    // Wire back to home control
    const backHomeBtn = programView.querySelector(".back-home-btn");
    if (backHomeBtn) {
      backHomeBtn.addEventListener("click", () => {
        window.location.hash = "";
      });
    }

    // Wire book trial buttons
    const ctaBtns = programView.querySelectorAll(".cta-booking-btn");
    ctaBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        closeProgramPage();
        setTimeout(() => {
          const targetForm = document.getElementById("trial");
          if (targetForm) {
            targetForm.scrollIntoView({ behavior: "smooth" });
            const selectBox = targetForm.querySelector("select[name='program']");
            if (selectBox) {
              const valueMap = {
                boxing: "Boxing",
                kickboxing: "Kickboxing",
                grappling: "Grappling",
                strength: "Grappling"
              };
              if (valueMap[programKey]) {
                selectBox.value = valueMap[programKey];
              }
            }
          }
        }, 700);
      });
    });

    // Initialize observers
    initProgramScrollReveals();
  }
};

const initProgramScrollReveals = () => {
  const revealElements = document.querySelectorAll("#program-view .reveal-element");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.08,
      rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add("in-view"));
  }
};

// --- SPA Router and History Management ---
let isInitialLoad = true;

const handleHashRoute = () => {
  const hash = window.location.hash.substring(1);
  const validPrograms = ["boxing", "kickboxing", "grappling", "strength"];

  if (validPrograms.includes(hash)) {
    openProgramPage(hash, isInitialLoad);
  } else {
    if (document.body.classList.contains("in-program-view")) {
      closeProgramPage(isInitialLoad);
    }
  }
  isInitialLoad = false;
};

window.addEventListener("hashchange", handleHashRoute);
window.addEventListener("DOMContentLoaded", handleHashRoute);

