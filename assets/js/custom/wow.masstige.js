/*
 *
 * wow custom script
 * 화면을 벗어나면 wow요소가 사라졌다가 스크롤 영역안에 들어오면 다시 효과 재생
 * Made By Masstige Publishing Team
 *
 * */

var $wow = $('.wow');
var lastSt = 0; // Detect Scroll Direction

$(document).ready(function(){
  $wow.css({
    "visibility": "hidden",
    "animation-name": "none"
  });
});

$(window).on('load', function(){
  $wow.each(function(){
    $(this).css({
      "visibility": "hidden",
      "animation-name": "none"
    });
  });
});

$(window).on('scroll', function () {
  var st = $(this).scrollTop(),
      sb = st + $(this).outerHeight(),
      sm = st + $(this).outerHeight()/2;

  if ($wow.length > 0) {
    $wow.each(function (index, elem) {
      var $this = $(this),
          thisTop = $(this).offset().top,
          thisBtm = thisTop + $(this).outerHeight(),
          direction = (st > lastSt) ? 'down' : 'up',
          wowClassIndex = Array.from($this[0].classList).indexOf('wow'),
          animationName = $this[0].classList[wowClassIndex + 1],
          so = 200; //offset

      if ( st > thisBtm || sb < thisTop ) {
        $this.removeClass('animated');
        $this.css({
          "visibility": "hidden",
          "animation-name": "none"
        });
      } else {
        if ( (sb-so) > thisTop && (st+so) < thisBtm ) {
          $this.addClass('animated');
          $this.css({
            "visibility": "visible",
            "animation-name": animationName
          });
        }
      }
    });
  }

  lastSt = $(this).scrollTop();
});