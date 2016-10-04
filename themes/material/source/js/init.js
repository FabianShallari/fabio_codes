/**
 * Created by fabian on 12/09/16.
 */
(function($){
  $(function(){

    $('.button-collapse').sideNav();
    smoothScroll.init();
    $('[data-close-sidenav]').click(function () {
      $('.button-collapse').sideNav('hide');
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
