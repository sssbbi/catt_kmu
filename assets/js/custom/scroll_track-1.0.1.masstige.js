'use strict';

(function ($) {
  $.fn.scrollTrack = function (options) {
    var settings = $.extend(
      {
        threshold: 20, // 임계치 ( * 상단 고정영역 높이 )
        activeClass: 'active', // 활성 클래스 네이밍
      },
      options
    );

    var $TARGET = $(this).length > 0 ? ($(this).prop('tagName') === 'BODY' ? $(window) : $(this)) : undefined,
      THRESHOLD = settings.threshold,
      ACTIVE_CLASS = settings.activeClass !== '' ? settings.activeClass : undefined;

    if ($TARGET !== undefined) {
      if ($TARGET[0] === window) {
        var TRACK = $(window),
          $nav = $('[data-track-nav=window]'),
          $elements = [];

        $nav.find('a').each(function (index) {
          var thisId = $(this).attr('href');
          $elements[index] = $(thisId);

          // if (index === 0) {
          //   $(this).addClass(ACTIVE_CLASS);
          // }
        });

        $TARGET.on('scroll', function () {
          var scrollTop = $(this).scrollTop(),
            scrollBottom = scrollTop + $(this).outerHeight();

          if ($(document).outerHeight() === scrollBottom) {
            $nav.find('a').removeClass(ACTIVE_CLASS);
            $nav.find('a:last-child').addClass(ACTIVE_CLASS);

          } else {
            $elements.forEach(function ($this, index, thisArray) {
              var thisTop = $this[0].offsetTop - THRESHOLD,
                thisId = $this.attr('id');

              if (index + 1 < thisArray.length) {
                var nextTop = thisArray[index + 1][0].offsetTop;

                if (scrollTop >= thisTop && scrollTop < nextTop) {
                  $nav.find('a').removeClass(ACTIVE_CLASS);
                  $nav.find('[href="#' + thisId + '"]').addClass(ACTIVE_CLASS);
                }
              } else {
                if (scrollTop >= thisTop) {
                  $nav.find('a').removeClass(ACTIVE_CLASS);
                  $nav.find('[href="#' + thisId + '"]').addClass(ACTIVE_CLASS);
                } 
              }

              if ( index === 0 ) {
                if ( scrollTop < thisTop ) {
                  $nav.find('a').removeClass(ACTIVE_CLASS);
                }
              }
            });
          }
        });
      } else {
        $TARGET.each(function () {
          var TRACK = $(this).attr('data-track'),
            $nav = $('[data-track-nav=' + TRACK + ']'),
            $elements = [];

          $nav.find('a').each(function (index) {
            var thisId = $(this).attr('href');
            $elements[index] = $(thisId);

            if (index === 0) {
              $(this).addClass(ACTIVE_CLASS);
            }
          });
          

          $TARGET.on('scroll', function () {
            var scrollTop = $(this).scrollTop(),
              scrollBottom = scrollTop + $(this).outerHeight();

              console.log(scrollTop);

            if ($(this).prop('scrollHeight') === scrollBottom) {
              $nav.find('a').removeClass(ACTIVE_CLASS);
              $nav.find('a').last().addClass(ACTIVE_CLASS);
            } else {
              $elements.forEach(function ($this, index, thisArray) {
                var thisTop = $this[0].offsetTop - THRESHOLD,
                  thisId = $this.attr('id');

                if (index + 1 < thisArray.length) {
                  var nextTop = thisArray[index + 1][0].offsetTop;

                  if (scrollTop >= thisTop && scrollTop < nextTop) {
                    $nav.find('a').removeClass(ACTIVE_CLASS);
                    $nav.find('[href="#' + thisId + '"]').addClass(ACTIVE_CLASS);
                  }
                } else {
                  if (scrollTop >= thisTop) {
                    $nav.find('a').removeClass(ACTIVE_CLASS);
                    $nav.find('[href="#' + thisId + '"]').addClass(ACTIVE_CLASS);
                  }
                }
              });
            }
          });
        });
      }
    }
  };
})(jQuery);
