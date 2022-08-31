(function ($){
  $.fn.navActive = function (options) {
    var settings = $.extend({
      depth1: undefined,
      depth2: undefined,
      depth3: undefined,
      activeClass: undefined
    }, options);
    

    var PATHNAME = window.location.pathname,
        LOCATION = PATHNAME.split('/'),
        LOCATION_DEPTH1 = depth1Check(LOCATION),
        LOCATION_DEPTH2 = depth2Check(LOCATION),
        LOCATION_DEPTH3 = depth3Check(LOCATION);

        console.log(LOCATION_DEPTH3);

    $(this).each(function(){
      var $DEPTH1 = settings.depth1 !== undefined ? $(this).find(settings.depth1) : undefined;
      var $DEPTH2 = settings.depth2 !== undefined ? $(this).find(settings.depth2) : undefined;
      var $DEPTH3 = settings.depth3 !== undefined ? $(this).find(settings.depth3) : undefined;

      
      if ( $DEPTH1.length > 0 ) { // $DEPTH1 엘리먼트가 있는지 유효성을 판단합니다.
        $DEPTH1.each(function(index, elem){
          var $THIS_LINK = $(this).children('a'),
              THIS_HREF = $THIS_LINK.attr('href').split('/'),
              THIS_DEPTH1 = THIS_HREF[THIS_HREF.length - 2];

          // LOCATION_DEPTH1, THIS_DEPTH1 비교
          if ( LOCATION_DEPTH1 === THIS_DEPTH1 ) {
            $THIS_LINK.addClass(settings.activeClass);
          }
        });
      }

      if ( $DEPTH2.length > 0 ) { // $DEPTH2 엘리먼트가 있는지 유효성을 판단합니다.
        $DEPTH2.each(function(){
          var $THIS_LINK = $(this).children('a'),
              THIS_HREF = $THIS_LINK.attr('href').split('/'),
              THIS_DEPTH2 = THIS_HREF[THIS_HREF.length - 1].replace('.html','');
  
          // LOCATION_DEPTH2, THIS_DEPTH2 비교
          if ( LOCATION_DEPTH2 === THIS_DEPTH2 ) {
            $THIS_LINK.addClass(settings.activeClass);
          }
        });
      }

      if ( $DEPTH3.length > 0 ) { // $DEPTH3 엘리먼트가 있는지 유효성을 판단합니다.
        $DEPTH3.each(function(){
          var $THIS_LINK = $(this).children('a'),
              THIS_HREF = $THIS_LINK.attr('href').split('/'),
              THIS_DEPTH3 = depth3Check(THIS_HREF);

          // LOCATION_DEPTH3, THIS_DEPTH3 비교
          if ( LOCATION_DEPTH3 === THIS_DEPTH3 ) {
            $THIS_LINK.addClass(settings.activeClass);
            
          }
        });
      }
      
    });

    function depth1Check(pathname) {
      if ( pathname.length > 2 ) {
        return LOCATION[LOCATION.length - 2];
      } else {
        return undefined;
      }
    }

    function depth2Check(pathname) {
      var depth2 =  pathname[pathname.length - 1].replace('.html','');

      if ( depth2.split('__').length > 1 ) {
        return depth2.split('__')[0];
      } else {
        return depth2;
      }
    }

    function depth3Check(pathname) {
      var depth2 =  pathname[pathname.length - 1].replace('.html','');

      if ( depth2.split('__').length > 1 ) {
        return depth2.split('__')[1];
      } else {
        return undefined;
      }
    }
  };
}(jQuery));

/* 선언문 */
$(document).ready(function(){
  $('.nav').navActive({
    depth1: ".depth-1",
    depth2: ".depth-2",
    depth3: ".depth-3",
    activeClass: "on"
  });
});
