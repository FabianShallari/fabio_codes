/**
 * Created by fabian on 04/10/16.
 */
$(document).ready(function () {
  $('.button-collapse').sideNav();

  $('[data-scroll]').smoothScroll();

  $('[data-close-sidenav]').click(function () {
    $('.button-collapse').sideNav('hide');
  });

  $('.carousel.carousel-slider').carousel({full_width: true});

  $('.showcase-next, .marvel-device').click(function () {
    $('.carousel.carousel-slider').carousel('next');
  });

  $('.showcase-previous').click(function () {
    $('.carousel.carousel-slider').carousel('prev');
  });
});