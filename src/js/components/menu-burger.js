const burger = document.querySelector('.burger');
const menu = document.querySelector('.hero__nav');
const menuMobile = document.querySelector('.menu-mobile');
const list = document.querySelector('.nav__list');
const wrap = document?.querySelector('.burger-wrap');





burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
 menu.classList.toggle('hero-nav--active');
 menuMobile.classList.toggle('menu--open');
  wrap?.classList.toggle('burger-wrap--close');
  list.classList.toggle('nav__list--tablet')


})
