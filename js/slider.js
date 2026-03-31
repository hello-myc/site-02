function initSlider(outer) {
  const track   = outer.querySelector('.slider-track');
  const btnPrev = outer.querySelector('.btnPrev');
  const btnNext = outer.querySelector('.btnNext');
  const cards   = Array.from(track.querySelectorAll('.card'));
  const total   = cards.length;
  let current   = 0;
  let cardW     = 0;
  let gap       = 0;
  let padL      = 0;
  let maxOffset = 0;

  function measure() {
    track.classList.add('no-anim');
    track.style.transform = 'translateX(0)';

    requestAnimationFrame(() => {
      cardW = cards[0].getBoundingClientRect().width;
      gap   = parseFloat(getComputedStyle(track).gap) || 12;
      padL  = parseFloat(getComputedStyle(track).paddingLeft) || 32;

      const trackOriginLeft = track.getBoundingClientRect().left;
      const availW = window.innerWidth - trackOriginLeft;

      maxOffset = Math.max(0, 2 * padL + total * cardW + (total - 1) * gap - availW);

      track.classList.remove('no-anim');
      goTo(current, false);
    });
  }

  function getOffset(idx) {
    return Math.min(idx * (cardW + gap), maxOffset);
  }

  function goTo(idx, animate = true) {
    current = Math.max(0, Math.min(idx, total - 1));
    if (!animate) track.classList.add('no-anim');
    const offset = getOffset(current);
    track.style.transform = `translateX(-${offset}px)`;
    if (!animate) requestAnimationFrame(() => track.classList.remove('no-anim'));
    btnPrev.disabled = current === 0;
    btnNext.disabled = offset >= maxOffset;
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // ── Touch swipe（mobile）──
  let touchStartX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta < -50) goTo(current + 1);
    else if (delta > 50) goTo(current - 1);
  });

  measure();

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(measure, 150);
  });
}

document.querySelectorAll('.slider-outer').forEach(outer => initSlider(outer));

