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

// --- Premium 3D Mouse Tilt Interaction ---
const isHoverSupported = window.matchMedia("(hover: hover)").matches;
if (isHoverSupported) {
  const tiltCards = document.querySelectorAll("[data-tilt]");
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angle (max 7-8 degrees for premium, subtle movement)
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-8px)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)";
    });
  });
}

