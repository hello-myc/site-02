const cardData = {
  card1: {
    eyebrow: "Project Overview",
    title: "App logo design.",
    body: "Selected as the official logo for the communication suite. <br>U Communication Suite is a platform for online meetings, webinars, and messaging.",
    image: "images/visual/logo-visual-1024-u.webp"
  },
  card2: {
    eyebrow: "Project Overview",
    title: "App logo design.",
    body: "Selected as the official logo for DirectorZone.<br>DirectorZone is a web platform for CyberLink registered users to connect, share ideas, and access free downloadable content.",
    image: "images/visual/logo-visual-1024-dz.webp"
  },
  card3: {
    eyebrow: "Project Overview",
    title: "Product page design.",
    body: "Product page design for PhotoDirector.<br>Aligned with marketing and product teams on strategy and direction before developing design drafts. Used Figma as a collaborative tool to gather feedback before final execution.",
    image: "images/visual/logo-visual-1024-phd.webp"
  },
  card4: {
    eyebrow: "Project Overview",
    title: "Logo renew proposal.",
    body: "Design proposals for CyberLink's main logo.<br> After more than 20 years in the industry, CyberLink aimed to refresh the logo—innovating while retaining its familiar look, rather than creating a completely new design..",
    image: "images/visual/logo-visual-1024-cl.webp"
  },
  card5: {
    eyebrow: "Project Overview",
    title: "App store image style design.",
    body: "App Store Promotional Visuals for PowerDirector.<br> Created a cohesive image style for PowerDirector's app store presence, ensuring consistency across all visual assets and enhancing brand recognition.",
    image: "images/visual/logo-visual-1024-app.webp"
  },
  card6: {
    eyebrow: "Project Overview",
    title: "Product page design.",
    body: "Product page design for PowerDVD.<br>Aligned with marketing and product teams on strategy and direction before developing design drafts. Used Figma as a collaborative tool to gather feedback before final execution.",
    image: "images/visual/logo-visual-1024-pdvd.webp"
  },
  card7: {
    eyebrow: "Project Overview",
    title: "Product page design.",
    body: "Product page design for AudioDirector.<br>Aligned with marketing and product teams on strategy and direction before developing design drafts. Used Figma as a collaborative tool to gather feedback before final execution.",
    image: "images/visual/logo-visual-1024-adr.webp"
  },
  card8: {
    eyebrow: "Project Overview",
    title: "AI generated content.",
    body: "AI has been integrated into the product and extensively applied across various design assets, including visuals and illustrations, while continuously fine-tuning it to maximize its effectiveness.",
    image: "images/visual/logo-visual-1024-ai.webp"
  },
  card9: {
    eyebrow: "Project Overview",
    title: "Feature graphic design.",
    body: "Feature images demonstrate the powerful and sometimes surreal results of layer editing, while ensuring users understand these effects are easy to recreate.",
    image: "images/visual/logo-visual-1024-layer.webp"
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
