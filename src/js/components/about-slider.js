import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);

const aboutSlider = document.querySelector('.aboutSlider');
if (aboutSlider) {
  const swiper = new Swiper(aboutSlider, {
    slidesPerView: 1,
    //spaceBetween: 30,
    freeMode: true,
    //autoplay: {
    //  delay: 3000,
     // },
      speed: 1000,
    navigation: {
      nextEl: ".about-slider-nav__next",
      prevEl: ".about-slider-nav__prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

}
