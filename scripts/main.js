document.addEventListener('DOMContentLoaded', () => {
  // Flip cards
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  // Intersection Observer for reveal/animate
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.info-column, .success-gallery img, .fade-in, .reveal')
    .forEach(el => observer.observe(el));

  // Modal helper
  function createModal(modalEl, openBtns = [], closeBtns = []) {
    if (!modalEl) return null;
    let lastFocus = null;

    // remember preferred display (some modals use flex, some block)
    const preferredDisplay = modalEl.dataset.display || getComputedStyle(modalEl).display || 'block';

    function open(trigger) {
      lastFocus = trigger || document.activeElement;
      modalEl.style.display = preferredDisplay;
      modalEl.setAttribute('aria-hidden', 'false');
      // focus first focusable inside modal if any
      const focusable = modalEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
      document.addEventListener('keydown', onKey);
    }

    function close() {
      modalEl.style.display = 'none';
      modalEl.setAttribute('aria-hidden', 'true');
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
    }

    openBtns.forEach(b => { if (b) b.addEventListener('click', (ev) => { ev.preventDefault(); open(b); }); });
    closeBtns.forEach(b => { if (b) b.addEventListener('click', (ev) => { ev.preventDefault(); close(); }); });

    // close when clicking the overlay (assumes modalEl is the overlay)
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) close();
    });

    return { open, close };
  }

  // Modal 1 (More Stories - uses flex)
  const modal1 = document.getElementById('modal');
  if (modal1) {
    modal1.dataset.display = 'flex';
    const openBtn = document.getElementById('seeMoreBtn');
    const closeBtn = document.getElementById('closeBtn');
    createModal(modal1, [openBtn], [closeBtn]);
  }

  // Modal 2 (Success Stories)
  const modal2 = document.getElementById('storiesModal2');
  if (modal2) {
    modal2.dataset.display = 'block';
    const openBtn2 = document.querySelector('.see-more-stories-btn');
    const close2 = document.querySelector('.close2');
    createModal(modal2, [openBtn2], [close2]);
  }
});
