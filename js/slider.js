(() => {
  const track   = document.getElementById('track');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const cards   = Array.from(track.querySelectorAll('.card'));
  const total   = cards.length;
  let current   = 0;
  let cardW     = 0;
  let gap       = 0;
  let padL      = 0;
  let maxOffset = 0;

  // 在 transform 歸零的狀態下量測，確保數值準確
  function measure() {
    track.classList.add('no-anim');
    track.style.transform = 'translateX(0)';

    // 等瀏覽器 reflow 完再量
    requestAnimationFrame(() => {
      cardW = cards[0].getBoundingClientRect().width;
      gap   = parseFloat(getComputedStyle(track).gap) || 12;
      padL  = parseFloat(getComputedStyle(track).paddingLeft) || 32;

      // track 左邊緣（此時 transform = 0，讀到的就是真實原點）
      const trackOriginLeft = track.getBoundingClientRect().left;
      const availW = window.innerWidth - trackOriginLeft;

      // 最後一張右邊緣距螢幕右側 = padL
      // padL + total*cardW + (total-1)*gap - maxOffset = availW - padL
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
    btnNext.disabled = getOffset(current + 1) >= maxOffset && offset >= maxOffset;
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  measure();

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(measure, 150);
  });
})();