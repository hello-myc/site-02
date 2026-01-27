document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.pattern-bg');
  if (!container) return;

  const HERO_HEIGHT = 800;   // Hero 高度
  const TOTAL = 40;           // 圖騰數量
  const images = [];

  const pageHeight = document.body.scrollHeight;

  for (let i = 0; i < TOTAL; i++) {
    const img = document.createElement('img');
    img.src = 'images/pattern.png'; // 路徑相對 HTML

    // 隨機大小 40% ~ 80% (假設以原圖寬度為 100px)
    const baseSize = 530;
    const scale = Math.random() * 0.4 + 0.4; // 0.4~0.8
    const size = baseSize * scale;
    img.style.width = `${size}px`;

    // 隨機位置，避開 Hero
    let top;
    do {
      top = Math.random() * pageHeight;
    } while (top < HERO_HEIGHT);

    img.style.top = `${top}px`;
    img.style.left = `${Math.random() * 100}%`;

    // 隨機旋轉
    img.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(img);
    images.push(img);
  }

  // scroll 控制圖騰淡入
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY < HERO_HEIGHT) return;

    const progress = Math.min(
      (scrollY - HERO_HEIGHT) / window.innerHeight,
      1
    );

    const visibleCount = Math.floor(progress * images.length);

    images.forEach((img, index) => {
      if (index < visibleCount) {
        img.style.opacity = 0.12; // 調整整體透明度
      }
    });
  });
});