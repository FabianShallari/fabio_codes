/**
 * Created by fabian on 04/10/16.
 */
$(document).ready(function () {
  $('.carousel.carousel-slider').carousel({full_width: true});

  setInterval(function () {
    $('.carousel.carousel-slider').carousel('next');
  }, 2500);
});