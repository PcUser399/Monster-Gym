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
// TRANSLATION DICTIONARIES
// ==========================================================================

const TRANSLATIONS = {
  en: {
    "nav.programs": "Programs",
    "nav.schedule": "Schedule",
    "nav.coaches": "Coaches",
    "nav.membership": "Membership",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.book": "Book a Trial",
    "hero.eyebrow": "Confidence. Energy. Discipline.",
    "hero.title1": "Train hard.",
    "hero.title2": "Move sharp.",
    "hero.title3": "Become a monster.",
    "hero.copy": "Boxing, kickboxing, grappling, and strength training in a world-class facility built for all levels.",
    "hero.trial": "Start Free Trial",
    "hero.explore": "Explore Classes",
    "programs.kicker": "Train Your Way",
    "programs.title": "Choose Your Fight",
    "programs.desc": "From striking to grappling, strength to conditioning. Find the program that pushes your limits.",
    "card.tag_boxing": "STRIKE",
    "card.title_boxing": "Boxing",
    "card.desc_boxing": "Build power, speed and confidence.",
    "card.action": "Enter program",
    "card.tag_kickbox": "POWER",
    "card.title_kickbox": "Kickboxing",
    "card.desc_kickbox": "Striking, combinations and conditioning.",
    "card.tag_grappling": "CONTROL",
    "card.title_grappling": "Grappling",
    "card.desc_grappling": "Control, technique and leverage.",
    "card.tag_strength": "FORCE",
    "card.title_strength": "Strength Training",
    "card.desc_strength": "Get strong. Stay strong. Perform better.",
    "about.kicker": "Team Monster",
    "about.title": "Serious training without the ego.",
    "about.copy": "Monster Gym pairs coach-led technique with conditioning that actually carries over to the mat, ring, and daily life. Show up consistent, leave stronger.",
    "features.kicker": "What You Get",
    "features.title": "Technique, sweat, recovery, repeat.",
    "features.c1_title": "Coach-led rounds",
    "features.c1_desc": "Every class has a clear focus, progression, and correction from experienced instructors.",
    "features.c2_title": "Real conditioning",
    "features.c2_desc": "Build power, stamina, mobility, and resilience with combat-ready training blocks.",
    "features.c3_title": "Clean intensity",
    "features.c3_desc": "Hard work, controlled contact, and a team culture that keeps training productive.",
    "schedule.kicker": "Weekly Flow",
    "schedule.title": "Classes that fit real life.",
    "schedule.col_day": "Day",
    "schedule.col_early": "Early",
    "schedule.col_evening": "Evening",
    "schedule.col_focus": "Focus",
    "schedule.day_mon": "Monday",
    "schedule.class_boxing": "Boxing",
    "schedule.class_kickbox": "Kickboxing",
    "schedule.focus_striking": "Striking",
    "schedule.day_tue": "Tuesday",
    "schedule.class_strength": "Strength",
    "schedule.class_grappling": "Grappling",
    "schedule.focus_control": "Control",
    "schedule.day_wed": "Wednesday",
    "schedule.class_sparring": "Sparring Lab",
    "schedule.focus_timing": "Timing",
    "schedule.day_thu": "Thursday",
    "schedule.class_mobility": "Mobility",
    "schedule.focus_power": "Power",
    "schedule.day_sat": "Saturday",
    "schedule.class_open": "Open Mat",
    "schedule.class_kids": "Kids",
    "schedule.focus_team": "Team",
    "coaches.kicker": "Coaches",
    "coaches.title": "Led by fighters. Built for members.",
    "coaches.c1_desc": "Boxing coach focused on fundamentals, footwork, and composure under pressure.",
    "coaches.c2_desc": "Kickboxing and conditioning coach with a sharp eye for clean mechanics.",
    "coaches.c3_desc": "Grappling coach specializing in beginner progression and competition prep.",
    "membership.kicker": "Membership",
    "membership.title": "Start with the trial. Stay for the standard.",
    "membership.copy": "Drop in for a coached trial class, meet the team, and find the right program before choosing a plan.",
    "membership.price_label": "Most popular",
    "membership.price_title": "Unlimited Training",
    "membership.price_sub": "/mo",
    "membership.f1": "All adult classes",
    "membership.f2": "Open mat access",
    "membership.f3": "Strength room blocks",
    "membership.f4": "Monthly progress check",
    "membership.cta": "Claim Trial Spot",
    "trial.kicker": "Book In",
    "trial.title": "Your first class is waiting.",
    "trial.label_name": "Name",
    "trial.placeholder_name": "Your name",
    "trial.label_email": "Email",
    "trial.placeholder_email": "you@example.com",
    "trial.label_program": "Program",
    "card.title_kids": "Kids Martial Arts",
    "trial.submit": "Request Trial",
    "footer.tagline": "Confidence. Energy. Discipline."
  },
  fr: {
    "nav.programs": "Programmes",
    "nav.schedule": "Planning",
    "nav.coaches": "Entraîneurs",
    "nav.membership": "Tarifs",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.book": "Réserver un essai",
    "hero.eyebrow": "Confiance. Énergie. Discipline.",
    "hero.title1": "Entraînez-vous dur.",
    "hero.title2": "Bougez avec précision.",
    "hero.title3": "Devenez un monstre.",
    "hero.copy": "Boxe, kickboxing, grappling et musculation dans un espace haut de gamme conçu pour tous les niveaux.",
    "hero.trial": "Essai Gratuit",
    "hero.explore": "Découvrir les cours",
    "programs.kicker": "Entraînez-vous à votre façon",
    "programs.title": "Choisissez votre combat",
    "programs.desc": "Du striking au grappling, de la force au conditionnement. Trouvez le programme qui repousse vos limites.",
    "card.tag_boxing": "STRIKING",
    "card.title_boxing": "Boxe",
    "card.desc_boxing": "Développez votre puissance, votre vitesse et votre confiance.",
    "card.action": "Découvrir le programme",
    "card.tag_kickbox": "PUISSANCE",
    "card.title_kickbox": "Kickboxing",
    "card.desc_kickbox": "Enchaînements, frappes et conditionnement physique.",
    "card.tag_grappling": "CONTRÔLE",
    "card.title_grappling": "Grappling",
    "card.desc_grappling": "Contrôle, technique et effet de levier.",
    "card.tag_strength": "FORCE",
    "card.title_strength": "Musculation & Force",
    "card.desc_strength": "Devenez fort. Restez fort. Soyez plus performant.",
    "about.kicker": "L'Équipe Monster",
    "about.title": "Un entraînement sérieux sans ego.",
    "about.copy": "Monster Gym associe des techniques guidées par des coachs à un conditionnement physique directement transférable sur le tatami, le ring et au quotidien. Soyez régulier, devenez plus fort.",
    "features.kicker": "Ce que vous obtenez",
    "features.title": "Technique, sueur, récupération, répétition.",
    "features.c1_title": "Rounds encadrés par un coach",
    "features.c1_desc": "Chaque cours bénéficie d'objectifs clairs, de progressions et de corrections par des instructeurs expérimentés.",
    "features.c2_title": "Vrai conditionnement",
    "features.c2_desc": "Développez votre puissance, endurance, mobilité et résilience grâce à des blocs d'entraînement conçus pour le combat.",
    "features.c3_title": "Intensité maîtrisée",
    "features.c3_desc": "Travail rigoureux, contacts contrôlés et esprit d'équipe garantissant des entraînements productifs.",
    "schedule.kicker": "Emploi du temps",
    "schedule.title": "Des cours adaptés à la vraie vie.",
    "schedule.col_day": "Jour",
    "schedule.col_early": "Matin",
    "schedule.col_evening": "Soir",
    "schedule.col_focus": "Objectif",
    "schedule.day_mon": "Lundi",
    "schedule.class_boxing": "Boxe",
    "schedule.class_kickbox": "Kickboxing",
    "schedule.focus_striking": "Striking",
    "schedule.day_tue": "Mardi",
    "schedule.class_strength": "Force",
    "schedule.class_grappling": "Grappling",
    "schedule.focus_control": "Contrôle",
    "schedule.day_wed": "Mercredi",
    "schedule.class_sparring": "Labo Sparring",
    "schedule.focus_timing": "Timing",
    "schedule.day_thu": "Jeudi",
    "schedule.class_mobility": "Mobilité",
    "schedule.focus_power": "Puissance",
    "schedule.day_sat": "Samedi",
    "schedule.class_open": "Tapis Libre",
    "schedule.class_kids": "Enfants",
    "schedule.focus_team": "Équipe",
    "coaches.kicker": "Coachs",
    "coaches.title": "Dirigé par des combattants. Conçu pour les membres.",
    "coaches.c1_desc": "Coach de boxe spécialisée dans les fondamentaux, le déplacement et le sang-froid sous pression.",
    "coaches.c2_desc": "Coach de kickboxing et conditionnement avec un œil affûté pour la biomécanique du mouvement.",
    "coaches.c3_desc": "Coach de grappling spécialisée dans l'initiation et la préparation à la compétition.",
    "membership.kicker": "Adhésion",
    "membership.title": "Commencez par l'essai. Adoptez la formule.",
    "membership.copy": "Venez pour un cours d'essai encadré, rencontrez l'équipe et trouvez le bon programme avant de choisir une formule.",
    "membership.price_label": "Le plus populaire",
    "membership.price_title": "Entraînement Illimité",
    "membership.price_sub": "/mois",
    "membership.f1": "Tous les cours adultes",
    "membership.f2": "Accès au tapis libre",
    "membership.f3": "Accès à la salle de musculation",
    "membership.f4": "Suivi mensuel personnalisé",
    "membership.cta": "Réserver mon cours d'essai",
    "trial.kicker": "Réservation",
    "trial.title": "Votre premier cours vous attend.",
    "trial.label_name": "Nom",
    "trial.placeholder_name": "Votre nom",
    "trial.label_email": "E-mail",
    "trial.placeholder_email": "vous@exemple.com",
    "trial.label_program": "Programme",
    "card.title_kids": "Arts Martiaux Enfants",
    "trial.submit": "Demander mon essai",
    "footer.tagline": "Confiance. Énergie. Discipline."
  }
};

// --- Language State Management ---
let currentLang = localStorage.getItem("monster_gym_lang") || "en";

const translatePage = (lang) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.setAttribute("placeholder", TRANSLATIONS[lang][key]);
    }
  });

  // Update active state in landing page language switchers
  const langBtns = document.querySelectorAll(".lang-switcher .lang-btn");
  langBtns.forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};

const setLanguage = (lang) => {
  currentLang = lang;
  localStorage.setItem("monster_gym_lang", lang);
  translatePage(lang);
  
  // Re-render the program page instantly if it is open
  if (document.body.classList.contains("in-program-view")) {
    const hash = window.location.hash.substring(1);
    const validPrograms = ["boxing", "kickboxing", "grappling", "strength"];
    if (validPrograms.includes(hash)) {
      renderProgramPage(hash);
    }
  }
};

// ==========================================================================
// PROGRAMS DESTINATION DATA, ROUTING, AND TEMPLATES
// ==========================================================================

const PROGRAMS_DATA = {
  en: {
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
  },
  fr: {
    boxing: {
      title: "Boxe",
      tag: "PROGRAMME 01 / STRIKING",
      statement: "Précision. Vitesse. Sang-froid.",
      subtext: "Maîtrisez le noble art. Apprenez les techniques de frappe précises, le jeu de jambes rythmé, les esquives, le contrôle du ring et une préparation physique conçue pour le 12e round.",
      stats: {
        skill: "Technique de Frappe",
        conditioning: "Capacité Aérobie",
        intensity: "Grande Vitesse",
        focus: "Précision & Timing"
      },
      why: [
        {
          title: "Frappes de Précision",
          desc: "Apprenez à transférer l'énergie du sol vers vos poings, avec un alignement parfait pour un impact maximal.",
          icon: "&#129354;"
        },
        {
          title: "Sang-Froid Défensif",
          desc: "Développez vos réflexes d'esquives et de parades. Apprenez à rester serein et lucide sous la pression.",
          icon: "&#128737;"
        },
        {
          title: "Préparation Combat",
          desc: "Développez une endurance spécifique au combat grâce au travail au sac de frappe, aux leçons aux paos et aux exercices d'agilité.",
          icon: "&#9889;"
        }
      ],
      train: [
        { title: "Mécanique des Coups", desc: "Développement de la puissance, de la vitesse et de la sécurité sur les directs, crochets et uppercuts." },
        { title: "Déplacements et Angles", desc: "Pivots, cadrage du ring et maintien d'un équilibre parfait pendant les enchaînements." },
        { title: "Esquives et Retraits", desc: "Éviter les coups à quelques millimètres près tout en restant en position idéale de contre-attaque." },
        { title: "Travail au Sac Lourd", desc: "Renforcement de l'impact, de l'alignement corporel et de la puissance de frappe continue." }
      ],
      ideal: [
        { title: "En quête de technique", desc: "Pour tous ceux qui souhaitent apprendre de réelles techniques de combat sans ego." },
        { title: "Focus Conditionnement", desc: "Pour les personnes voulant brûler des calories et développer une vraie vitesse athlétique." }
      ],
      experience: {
        title: "Précis & Concentré",
        desc: "La boxe chez Monster Gym est une affaire de stratégie et de précision, pas simplement de force brute. Nos cours sont structurés, encadrés par des coachs et se déroulent dans un environnement sans ego où priment la sécurité et la technique."
      },
      schedule: [
        { day: "Lundi / Mercredi", times: "07:00 Matin / 18:30 Soir" },
        { day: "Vendredi", times: "18:30 Labo Sparring" },
        { day: "Samedi", times: "10:00 Assauts Libres" }
      ]
    },
    kickboxing: {
      title: "Kickboxing",
      tag: "PROGRAMME 02 / PUISSANCE",
      statement: "Implacable. Explosif. Complet.",
      subtext: "Associez la boxe anglaise aux techniques de kick dynamiques. Développez un cardio à haute intensité, des enchaînements puissants et des réflexes affûtés.",
      stats: {
        skill: "Frappes 8-Points",
        conditioning: "Puissance Anaérobie",
        intensity: "Intensité Maximale",
        focus: "Enchaînements"
      },
      why: [
        {
          title: "Arsenal 8-Points",
          desc: "Utilisez vos poings, pieds, genoux et coudes. Développez une coordination et un timing de tout le corps.",
          icon: "&#128293;"
        },
        {
          title: "Cardio Intensif",
          desc: "Des intervalles à haute intensité qui stimulent votre fréquence cardiaque et renforcent votre capacité de récupération.",
          icon: "&#129505;"
        },
        {
          title: "Rythme & Fluidité",
          desc: "Apprenez à enchaîner naturellement les coups de poing avec des low-kicks et des high-kicks puissants.",
          icon: "&#127926;"
        }
      ],
      train: [
        { title: "Dynamique des Kicks", desc: "Maîtrise des coups de pied circulaires, directs (teeps) et fouettés avec vitesse et effet de levier." },
        { title: "Liaisons Poings-Pieds", desc: "Enchaînements fluides combinant la boxe anglaise et des frappes de jambes lourdes." },
        { title: "Exercices de Réflexes", desc: "Amélioration des temps de réaction et de la garde de protection avec paos de boxe et pattes d'ours." },
        { title: "Gainage & Endurance", desc: "Développement de la puissance du bas du corps, de la stabilité du buste et de la récupération." }
      ],
      ideal: [
        { title: "Passionnés d'intensité", desc: "Pour les personnes recherchant une dépense calorique massive combinée à des techniques de frappe pointues." },
        { title: "Athlètes Explosifs", desc: "Pour les pratiquants voulant intégrer le travail des jambes et le contrôle de la distance dans leur style." }
      ],
      experience: {
        title: "Énergie Explosive",
        desc: "Les cours de kickboxing sont rythmés et dynamiques. Vous allez transpirer, frapper dans les paos, enchaîner les rounds et apprendre la gestion de distance dans un groupe motivant encadré par des compétiteurs actifs."
      },
      schedule: [
        { day: "Lundi / Mercredi", times: "19:30 Soir Striking" },
        { day: "Mardi / Jeudi", times: "07:00 Matin / 19:00 Soir" },
        { day: "Samedi", times: "11:00 Clinique Travail aux Paos" }
      ]
    },
    grappling: {
      title: "Grappling",
      tag: "PROGRAMME 03 / CONTRÔLE",
      statement: "Levier. Intelligence. Maîtrise.",
      subtext: "Apprenez la lutte et le combat de soumission au sol. Contrôlez des adversaires plus lourds grâce à la précision géométrique de votre corps et votre calme.",
      stats: {
        skill: "Contrôle de Position",
        conditioning: "Force Isométrique",
        intensity: "Rythme Contrôlé",
        focus: "Calme Mental"
      },
      why: [
        {
          title: "Technique vs Force",
          desc: "Apprenez à utiliser l'alignement squelettique et la gravité pour contrôler le poids adverse, rendant la force secondaire.",
          icon: "&#128504;"
        },
        {
          title: "Jeu d'Échecs Physique",
          desc: "Considérez le tapis comme un échiquier. Anticipez les pièges, verrouillez les positions et finalisez avec précision.",
          icon: "&#129504;"
        },
        {
          title: "Gestion du Stress",
          desc: "Gardez votre sang-froid dans des positions inconfortables. Apprenez à respirer et à réfléchir sous la contrainte.",
          icon: "&#9994;"
        }
      ],
      train: [
        { title: "Lutte & Amenées au Sol", desc: "Maîtrise des projections, du travail au corps à corps (clinch) et des renversements depuis la garde." },
        { title: "Hiérarchie des Positions", desc: "Sécuriser les positions clés (montée, contrôle latéral, prise de dos) pour neutraliser les menaces." },
        { title: "Dégagements & Sorties", desc: "Se libérer des contrôles au sol et inverser des situations difficiles en toute sécurité." },
        { title: "Clés d'Articulations & Étranglements", desc: "Apprendre à soumettre avec contrôle et respect absolu de l'intégrité du partenaire." }
      ],
      ideal: [
        { title: "Profils Tactiques", desc: "Pour ceux qui aiment la résolution de problèmes, la physique des leviers et le combat rapproché." },
        { title: "Lutteurs Fonctionnels", desc: "Pour les pratiquants souhaitant développer un excellent contrôle au sol et une défense solide contre les soumissions." }
      ],
      experience: {
        title: "Cérébral & Technique",
        desc: "Notre surface de combat est un véritable laboratoire. Les cours se concentrent sur un apprentissage technique progressif et rigoureux, suivi de sparring à thèmes où vous appliquez logique et calme pour résoudre chaque situation."
      },
      schedule: [
        { day: "Mardi / Jeudi", times: "19:00 Lutte de Soumission" },
        { day: "Vendredi", times: "19:30 Forage Positionnel" },
        { day: "Samedi", times: "10:00 Tapis Libre / Roulades" }
      ]
    },
    strength: {
      title: "Musculation",
      tag: "PROGRAMME 04 / FORCE",
      statement: "Puissance. Résilience. Progression.",
      subtext: "Bâtissez une force fonctionnelle et une condition physique athlétique. Priorité aux mouvements polyarticulaires, à la stabilité du tronc et au renforcement articulaire.",
      stats: {
        skill: "Barre & Kettlebells",
        conditioning: "Endurance de Force",
        intensity: "Charges Lourdes",
        focus: "Surcharge Progressive"
      },
      why: [
        {
          title: "Mouvements de Base",
          desc: "Concentrez-vous sur le soulevé de terre, le squat et les développés. Bâtissez une armure physique utile partout.",
          icon: "&#127947;"
        },
        {
          title: "Articulations Fortes",
          desc: "Renforcez vos genoux, vos épaules et votre dos pour éviter les blessures au quotidien et à l'entraînement.",
          icon: "&#128170;"
        },
        {
          title: "Surcharge Progressive",
          desc: "Suivez précisément chaque charge soulevée. Faites des progrès constants et mesurés sous l'œil attentif du coach.",
          icon: "&#128200;"
        }
      ],
      train: [
        { title: "Mouvements de Force", desc: "Perfectionnement du squat, du soulevé de terre et du développé couché en toute sécurité." },
        { title: "Balistique Kettlebell", desc: "Développement de l'explosivité des hanches, de la force de rotation et du grip avec les swings." },
        { title: "Mobilité & Souplesse", desc: "Libérer les hanches et les épaules pour permettre des mouvements profonds et fluides sans douleur." },
        { title: "Renforcement du Tronc", desc: "Gainage lourd pour protéger la colonne vertébrale sous charge." }
      ],
      ideal: [
        { title: "Bâtisseurs de Force", desc: "Pour tous ceux qui veulent soulever lourd en sécurité, corriger leur posture et se forger un physique solide." },
        { title: "Athlètes de Combat", desc: "Pour les combattants cherchant à ajouter de l'explosivité et de la robustesse à leur préparation." }
      ],
      experience: {
        title: "Structuré & Progressif",
        desc: "Pas d'entraînements aléatoires ici. La musculation chez Monster Gym est programmée par blocs, notée méticuleusement et encadrée en insistant sur la forme, la respiration et la progression sécuritaire."
      },
      schedule: [
        { day: "Lun / Mer / Ven", times: "06:30 Matin / 12:00 Midi / 17:30 Soir" },
        { day: "Mardi / Jeudi", times: "06:30 Circuit Kettlebell / 18:00 Puissance Athlétique" },
        { day: "Samedi", times: "09:00 Labo Soulevé de Terre" }
      ]
    }
  }
};

const transitionOverlay = document.getElementById("transition-overlay");
const overlayTitle = transitionOverlay ? transitionOverlay.querySelector(".overlay-title") : null;
const programView = document.getElementById("program-view");

const openProgramPage = (programKey, instant = false) => {
  const data = PROGRAMS_DATA[currentLang][programKey];
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

  if (overlayTitle) {
    overlayTitle.textContent = currentLang === 'fr' ? "SELECTEUR D'ARENE" : "ARENA SELECTOR";
  }
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
  const data = PROGRAMS_DATA[currentLang][programKey];
  if (!data) return;

  const labels = currentLang === 'en' ? {
    skill: "SKILL",
    conditioning: "CONDITIONING",
    intensity: "INTENSITY",
    focus: "FOCUS",
    bookBtn: "Book a Trial",
    viewSchedule: "View Schedule",
    whyKicker: "WHY THIS PROGRAM ///",
    whyTitle: "THE STANDARD OF TRAINING",
    trainKicker: "WHAT YOU'LL TRAIN ///",
    trainTitle: "CURRICULUM BREAKDOWN",
    idealKicker: "SUITABLE FOR ///",
    idealTitle: "IDEAL FOR",
    experienceKicker: "CULTURE ///",
    experienceTitle: "TRAINING EXPERIENCE",
    scheduleKicker: "AVAILABILITY ///",
    scheduleTitle: "WEEKLY SCHEDULE",
    scheduleDayCol: "TRAINING DAY",
    scheduleTimeCol: "CLASS TIME",
    readyTitle: "READY TO BEGIN?",
    readyDesc: "Schedule your free coached trial session and meet the team.",
    readyBtn: "Book a Trial Session",
    switchLabel: "CHOOSE ANOTHER DISCIPLINE",
    backHome: "&larr; BACK TO ARENA",
    boxing: "BOXING",
    kickboxing: "KICKBOXING",
    grappling: "GRAPPLING",
    strength: "STRENGTH"
  } : {
    skill: "COMPÉTENCE",
    conditioning: "CONDITIONNEMENT",
    intensity: "INTENSITÉ",
    focus: "OBJECTIF",
    bookBtn: "Réserver un essai",
    viewSchedule: "Voir le planning",
    whyKicker: "POURQUOI CE PROGRAMME ///",
    whyTitle: "LE STANDARD D'ENTRAÎNEMENT",
    trainKicker: "CE QUE VOUS APPRENDREZ ///",
    trainTitle: "DÉTAIL DU PROGRAMME",
    idealKicker: "POUR QUI ///",
    idealTitle: "IDÉAL POUR",
    experienceKicker: "CULTURE ///",
    experienceTitle: "L'EXPÉRIENCE D'ENTRAÎNEMENT",
    scheduleKicker: "DISPONIBILITÉS ///",
    scheduleTitle: "PLANNING HEBDOMADAIRE",
    scheduleDayCol: "JOUR D'ENTRAÎNEMENT",
    scheduleTimeCol: "HORAIRE DU COURS",
    readyTitle: "PRÊT À COMMENCER ?",
    readyDesc: "Réservez votre séance d'essai gratuite encadrée et rencontrez l'équipe.",
    readyBtn: "Réserver ma séance d'essai",
    switchLabel: "CHOISIR UNE AUTRE DISCIPLINE",
    backHome: "&larr; RETOUR À L'ARÈNE",
    boxing: "BOXE",
    kickboxing: "KICKBOXING",
    grappling: "GRAPPLING",
    strength: "MUSCULATION"
  };

  const statsHtml = `
    <div class="program-stats-strip reveal-element">
      <div class="stat-box">
        <span class="stat-label">${labels.skill}</span>
        <span class="stat-value">${data.stats.skill}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${labels.conditioning}</span>
        <span class="stat-value">${data.stats.conditioning}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${labels.intensity}</span>
        <span class="stat-value">${data.stats.intensity}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">${labels.focus}</span>
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
    <div class="program-page-container theme-${programKey}" style="position: relative;">
      <!-- Language Switcher -->
      <div class="program-lang-switcher">
        <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        <span class="lang-divider">|</span>
        <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
      </div>

      <!-- Hero Section -->
      <header class="program-hero">
        <div class="hero-bg-effect"></div>
        <div class="hero-content-wrapper">
          <div class="program-meta-tag">${data.tag}</div>
          <h1 class="program-hero-title">${data.title}</h1>
          <p class="program-hero-statement">${data.statement}</p>
          <p class="program-hero-subtext">${data.subtext}</p>
          <div class="program-hero-actions">
            <button class="button primary cta-booking-btn">${labels.bookBtn}</button>
            <a href="#schedule" class="button secondary">${labels.viewSchedule}</a>
          </div>
        </div>
        ${statsHtml}
      </header>

      <!-- Why This Program -->
      <section class="program-why">
        <div class="section-kicker">${labels.whyKicker}</div>
        <h2 class="section-title">${labels.whyTitle}</h2>
        <div class="why-grid reveal-element reveal-stagger">
          ${whyHtml}
        </div>
      </section>

      <!-- What You'll Train -->
      <section class="program-train">
        <div class="section-kicker">${labels.trainKicker}</div>
        <h2 class="section-title">${labels.trainTitle}</h2>
        <div class="train-list reveal-element reveal-stagger">
          ${trainHtml}
        </div>
      </section>

      <!-- Ideal For & Experience (Split) -->
      <section class="program-split">
        <div class="split-column ideal-column reveal-element">
          <div class="section-kicker">${labels.idealKicker}</div>
          <h2 class="section-title">${labels.idealTitle}</h2>
          <div class="ideal-list">
            ${idealHtml}
          </div>
        </div>
        
        <div class="split-column experience-column reveal-element">
          <div class="section-kicker">${labels.experienceKicker}</div>
          <h2 class="section-title">${labels.experienceTitle}</h2>
          <div class="experience-card">
            <h3>${data.experience.title}</h3>
            <p>${data.experience.desc}</p>
          </div>
        </div>
      </section>

      <!-- Schedule Preview -->
      <section class="program-schedule" id="schedule">
        <div class="section-kicker">${labels.scheduleKicker}</div>
        <h2 class="section-title">${labels.scheduleTitle}</h2>
        <div class="schedule-preview-box reveal-element">
          <div class="schedule-preview-row header">
            <span>${labels.scheduleDayCol}</span>
            <span>${labels.scheduleTimeCol}</span>
          </div>
          ${scheduleHtml}
        </div>
      </section>

      <!-- Bottom Nav / Switcher / CTA -->
      <footer class="program-cta-footer">
        <div class="footer-cta-content reveal-element">
          <h2>${labels.readyTitle}</h2>
          <p>${labels.readyDesc}</p>
          <button class="button primary cta-booking-btn">${labels.readyBtn}</button>
        </div>
        
        <!-- Program Switcher -->
        <div class="program-switcher-wrap reveal-element">
          <span class="switcher-label">${labels.switchLabel}</span>
          <div class="switcher-links">
            <button data-switch="boxing" class="switch-btn">${labels.boxing}</button>
            <button data-switch="kickboxing" class="switch-btn">${labels.kickboxing}</button>
            <button data-switch="grappling" class="switch-btn">${labels.grappling}</button>
            <button data-switch="strength" class="switch-btn">${labels.strength}</button>
          </div>
        </div>

        <!-- Back to home link -->
        <div class="back-home-wrap reveal-element">
          <button class="back-home-btn">${labels.backHome}</button>
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

    // Wire program language switcher buttons
    const progLangBtns = programView.querySelectorAll(".program-lang-switcher .lang-btn");
    progLangBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedLang = btn.getAttribute("data-lang");
        setLanguage(selectedLang);
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
              const indexMap = {
                boxing: 0,
                kickboxing: 1,
                grappling: 2,
                strength: 2
              };
              if (indexMap[programKey] !== undefined) {
                selectBox.selectedIndex = indexMap[programKey];
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

window.addEventListener("DOMContentLoaded", () => {
  // Wire landing page language switcher buttons
  document.querySelectorAll(".lang-switcher .lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      setLanguage(selectedLang);
    });
  });

  translatePage(currentLang);
  handleHashRoute();
});

