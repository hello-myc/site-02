
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