const cardData = {
  card1: {
    eyebrow: "專案簡介",
    title: "應用程式 logo 設計",
    body: "獲選為 U 整合通訊的官方 logo。<br>U 整合通訊是一個集線上會議、視訊網路研討會及即時通訊於一體的平台。",
    image: "images/visual/logo-visual-1024-u.webp"
  },
  card2: {
    eyebrow: "專案簡介",
    title: "應用程式 logo 設計",
    body: "獲選為 DirectorZone 的官方 logo。<br>DirectorZone 是訊連科技 (CyberLink) 為註冊用戶打造的網頁平台，提供社群互動、創意分享以及免費內容下載。",
    image: "images/visual/logo-visual-1024-dz.webp"
  },
  card3: {
    eyebrow: "專案簡介",
    title: "產品頁面設計",
    body: "相片大師 (PhotoDirector) 產品頁面設計。<br>在開發設計草稿前，與行銷及產品團隊針對策略與方向達成共識，並使用 Figma 作為協作工具，並在定案前整合各方意見回饋並進行最佳化。",
    image: "images/visual/logo-visual-1024-phd.webp"
  },
  card4: {
    eyebrow: "專案簡介",
    title: "Logo 更新提案",
    body: "訊連科技 (CyberLink) 品牌識別更新提案。<br>針對具備20年品牌歷史的訊連科技進行 Logo 調整。設計策略聚焦於演進而非革命，在維持既有品牌連結的同時注入創新元素，達成視覺上的更新。",
    image: "images/visual/logo-visual-1024-cl.webp"
  },
  card5: {
    eyebrow: "專案簡介",
    title: "應用程式商店視覺設計",
    body: "威力導演 (PowerDirector) 在應用程式商店上的廣告視覺。<br>為威力導演在應用程式商店的呈現一致性的視覺風格，不僅強化了品牌辨識度，也提升了整體產品形象。",
    image: "images/visual/logo-visual-1024-app.webp"
  },
  card6: {
    eyebrow: "專案簡介",
    title: "產品頁面設計",
    body: "PowerDVD 產品頁面設計。<br>在開發設計草稿前，與行銷及產品團隊針對策略與方向達成共識，並使用 Figma 作為協作工具，並在定案前整合各方意見回饋並進行最佳化。",
    image: "images/visual/logo-visual-1024-pdvd.webp"
  },
  card7: {
    eyebrow: "專案簡介",
    title: "產品頁面設計",
    body: "AudioDirector 產品頁面設計。<br>在開發設計草稿前，與行銷及產品團隊針對策略與方向達成共識，並使用 Figma 作為協作工具，並在定案前整合各方意見回饋並進行最佳化。",
    image: "images/visual/logo-visual-1024-adr.webp"
  },
  card8: {
    eyebrow: "專案簡介",
    title: "AI 生成內容",
    body: "主導 AI 技術在產品與各類設計資產（如視覺影像、插畫）中的深度應用。透過持續的參數微調與流程最佳化，大幅提升設計產出效能並確保視覺品質。",
    image: "images/visual/logo-visual-1024-ai.webp"
  },
  card9: {
    eyebrow: "專案簡介",
    title: "產品功能視覺設計",
    body: "透過功能視覺圖來傳達圖層編輯技術能創造的震撼與超現實美感。設計策略在於平衡「強大的功能性」與「簡單的操作感」，讓使用者在被視覺吸引的同時，對產品的易用性產生信心。",
    image: "images/visual/logo-visual-1024-layer.webp"
  },
  card10: {
    eyebrow: "專案簡介",
    title: "AI 影片編輯視覺設計",
    body: "AI 編輯功能的視覺設計。著重在於將複雜的 AI 應用轉化為更直覺的視覺說明，讓用戶感受到只需簡單步驟，就能產出高質量的影片內容。",
    image: "images/visual/logo-visual-1024-ai-feature.webp"
  },
  card11: {
    eyebrow: "專案簡介",
    title: "影片模板視覺設計",
    body: "設計一系列影片模板視覺，直覺地向使用者展示影片編輯工具的實際應用潛力與產出品質。",
    image: "images/visual/logo-visual-1024-template.webp"
  },
  card12: {
    eyebrow: "專案簡介",
    title: "產品功能視覺設計",
    body: "透過功能視覺圖來傳達圖層編輯技術能創造的震撼與超現實美感。設計策略在於平衡「強大的功能性」與「簡單的操作感」，讓使用者在被視覺吸引的同時，對產品的易用性產生信心。",
    image: "images/visual/logo-visual-1024-layer2.webp"
  },
  card13: {
    eyebrow: "專案簡介",
    title: "SEO 使用情境頁面設計",
    body: "使用情境頁面呈現產品在真實情境中的應用，提供具體案例與操作場景，並針對明確的 SEO 目標進行最佳化，以提升搜尋能見度。",
    image: "images/visual/logo-visual-1024-use.webp"
  },
  card14: {
    eyebrow: "專案簡介",
    title: "標準字設計",
    body: "獲選為 Moovielive 的官方品牌標準字。<br>Moovielive 是 PowerDVD 的擴展服務，提供電影資訊和可下載內容。",
    image: "images/visual/moovielive_logo.webp"
  }
};

function openModal(id) {
  const data = cardData[id];
  document.getElementById('modal-body').innerHTML = data.body;
  document.getElementById('modal-eyebrow').textContent = data.eyebrow;
  document.getElementById('modal-title').textContent = data.title;
  // document.getElementById('modal-body').textContent = data.body;

  const img = document.getElementById('modal-image');
  if (data.image) {
    img.src = data.image;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }

  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
