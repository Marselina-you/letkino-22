import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  freeMode: true,
  autoplay: {
    delay: 3000,
    },
    speed: 1000,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
