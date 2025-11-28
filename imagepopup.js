// script.js
// Behavior: when scrollY >= APPEAR_AT the image appears and is "locked" to the document Y
// where it first appeared (so it stays at that exact position while you continue to scroll).
// When scrollY < APPEAR_AT the image hides. Each time it appears we re-position it to the
// current viewport center so it appears where the user saw it.

(function () {
  const APPEAR_AT = 800; // px from top where the image will appear when crossed downward

  const container = document.getElementById('subject-container');
  const img = document.getElementById('subject-img');
  const repeatsContainer = document.querySelector('.repeats');

  if (!container || !img) return;

  // Fill content to make the page scrollable (keeps index.html small)
  (function fillRepeats(count = 40) {
    if (!repeatsContainer) return;
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `<p>Block ${i+1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, massa sed luctus volutpat.</p>`;
    }
    repeatsContainer.innerHTML = html;
  })();

  let lastKnownScrollY = window.scrollY || window.pageYOffset;
  let ticking = false;
  let isVisible = false;

  function showAndLockAtCurrentViewport() {
    // Compute the document Y coordinate that corresponds to the viewport center,
    // then set container.style.top so it stays at that document Y.
    const viewportCenterDocY = (window.scrollY || window.pageYOffset) + window.innerHeight / 2;
    container.style.top = `${Math.round(viewportCenterDocY)}px`;
    // Ensure container uses absolute position (it already does in CSS) and slide it in
    container.classList.add('visible');
    container.setAttribute('aria-hidden', 'false');
    isVisible = true;
  }

  function hideAndResetPosition() {
    container.classList.remove('visible');
    container.setAttribute('aria-hidden', 'true');
    // keep top value if you want (no need to clear). We can clear it to reset:
    // container.style.top = ''; 
    isVisible = false;
  }

  function updateVisibility(scrollY) {
    if (!isVisible && scrollY >= APPEAR_AT) {
      // Crossed the threshold downward -> show and lock to current position
      showAndLockAtCurrentViewport();
    } else if (isVisible && scrollY < APPEAR_AT) {
      // Scrolled back up above threshold -> hide
      hideAndResetPosition();
    }
    // Note: while visible, subsequent scrolling does NOT move the container's top,
    // so it stays at the same document coordinate where it first appeared.
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

  // Initialize based on current scroll position (in case page is loaded scrolled)
  window.addEventListener('load', function () {
    updateVisibility(window.scrollY || window.pageYOffset);
  });

  window.addEventListener('scroll', onScroll, { passive: true });

  // On resize, if the element is currently visible you may want to re-lock it to center,
  // or keep the original lock. Uncomment the following to re-lock on resize:
  // window.addEventListener('resize', function () {
  //   if (isVisible) showAndLockAtCurrentViewport();
  // });

  // Optional: clicking the image scrolls to top
  container.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Show immediately if user interacts (wheel/touch)
  ['wheel','touchstart'].forEach(evt => {
    window.addEventListener(evt, () => {
      updateVisibility(window.scrollY || window.pageYOffset);
    }, { passive: true });
  });
})();