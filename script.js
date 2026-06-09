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
