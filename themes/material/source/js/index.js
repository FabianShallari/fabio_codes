/**
 * Created by fabian on 04/10/16.
 */
$(document).ready(function () {
  $('.carousel.carousel-slider').carousel({full_width: true});

  $('.showcase-next').click(function () {
    $('.carousel.carousel-slider').carousel('next');
  });

  $('.showcase-previous').click(function () {
    $('.carousel.carousel-slider').carousel('prev');
  });

  // setInterval(function () {
  //   $('.carousel.carousel-slider').carousel('next');
  // }, 2500);
});