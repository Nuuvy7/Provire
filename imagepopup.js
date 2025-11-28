// script.js
// Show the left-side subject image only while scrollY is inside a configured range.
// The image appears when scrollY >= APPEAR_AT and disappears when scrollY > DISAPPEAR_AFTER
// (i.e., visible while APPEAR_AT <= scrollY <= DISAPPEAR_AFTER).
//
// Change APPEAR_AT and DISAPPEAR_AFTER below to set your desired range.
// You can also use percent-of-height logic (example commented below).

(function () {
  // ---- CONFIGURE THESE ----
  const APPEAR_AT = 550;      // px scroll down to start showing
  const DISAPPEAR_AFTER = 950; // px scroll after which it disappears again
  // -------------------------

  // Example: if you'd rather use percentages of the total scrollable height:
  //   const percentAppear = 10; // 10% from top
  //   const percentDisappear = 60; // 60% from top
  //   // then compute:
  //   // const APPEAR_AT = (document.documentElement.scrollHeight - window.innerHeight) * (percentAppear / 100);

  const container = document.getElementById('subject-container');
  const img = document.getElementById('subject-img');

  if (!container || !img) {
    return;
  }

  let lastKnownScrollY = window.scrollY;
  let ticking = false;

  function isInRange(scrollY) {
    // Visible while inside the inclusive range [APPEAR_AT, DISAPPEAR_AFTER]
    return scrollY >= APPEAR_AT && scrollY <= DISAPPEAR_AFTER;
  }

  function updateVisibility(scrollY) {
    if (isInRange(scrollY)) {
      if (!container.classList.contains('visible')) {
        container.classList.add('visible');
        container.setAttribute('aria-hidden', 'false');
      }
    } else {
      if (container.classList.contains('visible')) {
        container.classList.remove('visible');
        container.setAttribute('aria-hidden', 'true');
      }
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

  // Initialize
  window.addEventListener('load', function () {
    // If you want APPEAR_AT/DISAPPEAR_AFTER to be percent-based, compute them here using scrollHeight.
    updateVisibility(window.scrollY);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    // If you're using percent-based thresholds, recompute them here on resize:
    // (not required for fixed px thresholds)
    updateVisibility(window.scrollY);
  });

  // Optional interaction: click the image to scroll to top
  container.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();