
let swiper;

function initSwiper() {
  if (window.innerWidth <= 961 && !swiper) {
    swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else if (window.innerWidth > 961 && swiper) {
    swiper.destroy(true, true);
    swiper = null;
  }
}

window.addEventListener('load', initSwiper);
window.addEventListener('resize', initSwiper);


function handleCardOpacity() {
    const cards = document.querySelectorAll('.work-card');
    
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        
        // Check how many cards are stacked above this one
        let cardsAbove = 0;
        cards.forEach((otherCard, otherIndex) => {
            if (otherIndex > index) {
                const otherRect = otherCard.getBoundingClientRect();
                if (otherRect.top <= 140) { // Slightly below sticky point
                    cardsAbove++;
                }
            }
        });
        
        // Hide if more than 2 cards are above
        card.style.opacity = cardsAbove >= 2 ? 0 : 1;
        card.style.transition = 'opacity 0.4s ease';
    });
}

window.addEventListener('scroll', handleCardOpacity);
handleCardOpacity();