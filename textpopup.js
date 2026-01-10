(function () {
  const APPEAR_AT_TEXT = 560; // px from top where text appears when crossed downward

  const container = document.getElementById('text-container');
  const content = document.getElementById('text-content');

  if (!container || !content) return;

  let lastKnownScrollY = window.scrollY || window.pageYOffset;
  let ticking = false;
  let isVisible = false;

  function showAndLockAtCurrentViewport() {
    const viewportCenterDocY = (window.scrollY || window.pageYOffset) + window.innerHeight / 2;
    container.style.top = `${Math.round(viewportCenterDocY)}px`;
    container.classList.add('visible');
    container.setAttribute('aria-hidden', 'false');
    isVisible = true;
  }

  function hideAndResetPosition() {
    container.classList.remove('visible');
    container.setAttribute('aria-hidden', 'true');
    isVisible = false;
  }

  function updateVisibility(scrollY) {
    if (!isVisible && scrollY >= APPEAR_AT_TEXT) {
      showAndLockAtCurrentViewport();
    } else if (isVisible && scrollY < APPEAR_AT_TEXT) {
      hideAndResetPosition();
    }
  }

  function onScroll() {
    lastKnownScrollY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateVisibility(lastKnownScrollY);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('load', function () {
    updateVisibility(window.scrollY || window.pageYOffset);
  });

  window.addEventListener('scroll', onScroll, { passive: true });

  // Clicking the text can scroll to the About section
  container.addEventListener('click', function () {
    const target = document.querySelector('.sec3');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });

  ['wheel','touchstart'].forEach(evt => {
    window.addEventListener(evt, () => {
      updateVisibility(window.scrollY || window.pageYOffset);
    }, { passive: true });
  });

})();
