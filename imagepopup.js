// script.js
// Show/hide the left-side subject image when scrolling past thresholds.
// Uses hysteresis (showThreshold / hideThreshold) to avoid flicker.

(function () {
  // If you want immediate show/hide with no hysteresis, set hideThreshold === showThreshold.
  const SHOW_THRESHOLD = 200; // px scroll down to show
  const HIDE_THRESHOLD = 160; // px scroll up to hide (hysteresis)

  const container = document.getElementById('subject-container');
  const img = document.getElementById('subject-img');

  if (!container || !img) {
    // Elements not present — nothing to do
    return;
  }

  let lastKnownScrollY = window.scrollY;
  let ticking = false;

  function updateVisibility(scrollY) {
    const isVisible = container.classList.contains('visible');

    if (!isVisible && scrollY >= SHOW_THRESHOLD) {
      container.classList.add('visible');
      container.setAttribute('aria-hidden', 'false');
    } else if (isVisible && scrollY <= HIDE_THRESHOLD) {
      container.classList.remove('visible');
      container.setAttribute('aria-hidden', 'true');
    }
  }

  function onScroll() {
    lastKnownScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateVisibility(lastKnownScrollY);
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initialize state on load
  window.addEventListener('load', function () {
    updateVisibility(window.scrollY);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    // On resize you may want to re-evaluate visibility
    updateVisibility(window.scrollY);
  });

  // Optional: allow clicking the image to scroll to top smoothly
  container.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Also show immediately if user starts interacting via wheel or touch (nice UX)
  ['wheel','touchstart'].forEach(evt => {
    window.addEventListener(evt, () => {
      updateVisibility(window.scrollY);
    }, { passive: true });
  });
})();
