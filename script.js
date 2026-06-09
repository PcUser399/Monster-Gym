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

