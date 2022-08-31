'use strict';

/* 브라우저 너비, 높이 체크 */
var breakCheck = $(window).outerWidth() > 1024 || $(window).outerHeight() > 800;

function fullpageParallaxInit() {
  var parallaxResizing = true;

  $(document).ready(function () {
    if (breakCheck) {
      var outerHeight = $('.fp-section').outerHeight();

      $('.fp-bg').each(function (index) {
        $(this).css({
          'height': outerHeight,
          'transform': 'translateY(' + (outerHeight * -1) + 'px)',
          'z-index': (index * -1)
        });
      });
    }
  });

  $(window).on('resize', function () {
    if (parallaxResizing) {
      parallaxResizing = false;

      setTimeout(function () {
        if (breakCheck) {
          var outerHeight = $('.fp-section').outerHeight();

          $('.fp-bg').each(function (index) {
            $(this).css({
              'height': outerHeight
            });
          });
        } else {
          $('.fp-bg').each(function (index) {
            $(this).css({
              'transform': 'translateY(0)',
              'z-index': 0
            });
          });
        }

        parallaxResizing = true;
      }, 100);
    }
  });
}

function fullpageParallax(origin, destination, direction) {
  if (breakCheck) {
    var $currSection = $(origin.item); /* 현재 섹션 */
    var $currHasBg = $currSection.find('.fp-bg').length > 0; /* 현재 섹션 .fp-bg 유효성 체크 */
    var $currBg = $currHasBg ? $currSection.find('.fp-bg') : undefined; /* $currHasBg가 참일 경우 .fp-bg 저장 */
    var $nextSection = $(destination.item);/* 다음섹션 */
    var $nextHasBg = $nextSection.find('.fp-bg').length > 0; /* 다음 섹션 .fp-bg 유효성 체크 */
    var $nextBg = $nextHasBg ? $nextSection.find('.fp-bg') : undefined; /* $nextHasBg가 참일 경우 .fp-bg 저장 */
    var $nextAutoHeight = $(destination.item).hasClass('fp-auto-height'); /* 다음 섹션의 .fp-auto-height 유무 체크 */

    /* 슬라이드 방향이 down 이고 다음 섹션에 .fp-bg가 있을 경우 */
    if (direction === 'down' && $nextHasBg) {
      $nextBg.css({
        'transform': 'translateY(0)'
      });
    }

    /* 슬라이드 방향이 up 이고 다음 섹션에 .fp-bg가 있을 경우 */
    if (direction === "up" && $nextHasBg) {
      $nextBg.css({
        'transform': 'translateY(0)'
      });
    }

    /* 슬라이드 방향이 up 이고 현재 섹션에 .fp-bg가 있을 경우 */
    if (direction === "up" && $currHasBg) {
      $currBg.css({
        'transform': 'translateY(' + ($('.fp-section').outerHeight() * -1) + 'px)'
      });
    }

    /* 다음 슬라이드가 fp-auto-height 인 경우 */
    if ($nextAutoHeight) {
      var $prevBg = $(destination.item).prev().find('.fp-bg');

      $prevBg.css({
        'transform':'translateY(0)'
      });
    }
  }
}
