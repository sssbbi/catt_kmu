"use strict";

/* 
  Fullpage Plugin Customizing.
  Created By Masstige.
  Created Date : 2021-11-09
  
  HTML : section 태그에 .fp-coverflow 클래스 추가.
  JS : Fullpage 선언 시 onLeave 이벤트에 아래와 같이 선언.
  [Example]
  onLeave: function (origin, destination, direction) {
    fullpageCoverflow(origin, destination, direction);
  }

  ** /include/js.html 파일의 호출 구문 주석 제거 후 사용. (line:24)
*/
function fullpageCoverflow(origin, destination, direction) {
  var outerHeight = $(window).outerHeight() + 'px';

  if (direction === "down") {
    if ($(destination.item).hasClass('fp-coverflow')) {
      $(origin.item).css('transform', 'translateY(' + outerHeight + ')');
    }
  } else {
    if ($(destination.item).hasClass('fp-coverflow') || $(origin.item).hasClass('fp-coverflow')) {
      $(destination.item).css({
        'transform': 'translateY(0)'
      });
    }
  }
}
