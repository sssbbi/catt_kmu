/*
*
* Navigation Active Plugin version 1.1.6
* Made By Masstige Publishing Team
*
* */

(function ($) {
  $.fn.navActive = function (options) {
    var settings = $.extend(
      {
        depth1: undefined,
        depth2: undefined,
        depth3: undefined,
        activeClass: 'on', // Default : on
        callback: function () {},
      },
      options
    );

    var PATHNAME = window.location.pathname,
      LOCATION = PATHNAME.split('/'),
      LOCATION_DEPTH1 = depth1Check(LOCATION), // depth1 체크 함수
      LOCATION_DEPTH2 = depth2Check(LOCATION), // depth2 체크 함수
      LOCATION_DEPTH3 = depth3Check(LOCATION), // depth3 체크 함수
      SEARCH = window.location.search; // search 값

    var $THIS = $(this);

    $THIS.each(function () {
      var $DEPTH1 = settings.depth1 !== undefined ? $(this).find(settings.depth1) : undefined;
      var $DEPTH2 = settings.depth2 !== undefined ? $(this).find(settings.depth2) : undefined;
      var $DEPTH3 = settings.depth3 !== undefined ? $(this).find(settings.depth3) : undefined;

      if ($DEPTH1 !== undefined) {
        // $DEPTH1의 클래스 옵션값 유효성 체크
        if ($DEPTH1.length > 0) {
          // $DEPTH1이 문서에 존재하는지 유효성 체크
          $DEPTH1.each(function (index, elem) {
            var $THIS_LINK = $(this).children('a'),
              THIS_HREF = $THIS_LINK.attr('href').split('/'),
              THIS_DEPTH1 = depth1Check(THIS_HREF);

            // LOCATION_DEPTH1, THIS_DEPTH1 비교
            if (LOCATION_DEPTH1 === THIS_DEPTH1) {
              $THIS_LINK.addClass(settings.activeClass);
            }
          });
        }
      }

      if ($DEPTH2 !== undefined) {
        // $DEPTH1의 클래스 옵션값 유효성 체크
        if ($DEPTH2.length > 0) {
          // $DEPTH1이 문서에 존재하는지 유효성 체크
          $DEPTH2.each(function () {
            var $THIS_LINK = $(this).children('a'),
              THIS_HREF = $THIS_LINK.attr('href').split('/'),
              THIS_DEPTH2 = depth2Check(THIS_HREF),
              SEARCH_VALIDATE = searchCheck(SEARCH, THIS_DEPTH2),
              BOARD_CHECK = boardCheck(LOCATION_DEPTH2);

            // 현재 URL과 비교 대상이되는 href값 모두 search(=parameter)값이 존재하는지 체크
            if (SEARCH_VALIDATE) {
              // LOCATION_DEPTH2, THIS_DEPTH2 비교 ( SEARCH값 포함 )
              if (LOCATION_DEPTH2 + SEARCH === THIS_DEPTH2) {
                $THIS_LINK.addClass(settings.activeClass);
              }
            } else {
              // -view, -write를 포함하는 경우
              if ( BOARD_CHECK[0] === true ) {
                LOCATION_DEPTH2 = LOCATION_DEPTH2.replace(BOARD_CHECK[1], '')
              }

              // LOCATION_DEPTH2, THIS_DEPTH2 비교 ( SEARCH값 미포함 )
              if (LOCATION_DEPTH2 === THIS_DEPTH2) {
                $THIS_LINK.addClass(settings.activeClass);
              }
            }
          });
        }
      }

      if ($DEPTH3 !== undefined) {
        // $DEPTH1의 클래스 옵션값 유효성 체크
        if ($DEPTH3.length > 0) {
          // $DEPTH1이 문서에 존재하는지 유효성 체크
          $DEPTH3.each(function () {
            var $THIS_LINK = $(this).children('a'),
              THIS_HREF = $THIS_LINK.attr('href').split('/'),
              THIS_DEPTH3 = depth3Check(THIS_HREF),
              SEARCH_VALIDATE = searchCheck(SEARCH, THIS_DEPTH3);

            // 현재 URL과 비교 대상이되는 href값 모두 search(=parameter)값이 존재하는지 체크
            if (SEARCH_VALIDATE) {
              // LOCATION_DEPTH3, THIS_DEPTH3 비교 ( SEARCH값 포함 )
              if (LOCATION_DEPTH3 + SEARCH === THIS_DEPTH3) {
                $THIS_LINK.addClass(settings.activeClass);
              }
            } else {
              // LOCATION_DEPTH3, THIS_DEPTH3 비교 ( SEARCH값 미포함 )
              if (LOCATION_DEPTH3 === THIS_DEPTH3) {
                $THIS_LINK.addClass(settings.activeClass);
              }
            }
          });
        }
      }

      // 콜백함수 실행
      settings.callback();
    });

    // 현재 URL의 depth1 값이 유효한지 체크하는 함수입니다.
    function depth1Check(pathname) {
      if (pathname.length > 2) {
        return pathname[pathname.length - 2]; // depth1 저장
      } else {
        return undefined;
      }
    }

    // 현재 URL의 depth2 값이 유효한지 체크하는 함수입니다.
    // depth1의 이름이 같을 수 있기 때문에 depth1도 가져옵니다.
    function depth2Check(pathname) {
      var depth1 = pathname[pathname.length - 2], // depth1 저장
        depth2 = pathname[pathname.length - 1].replace('.html', ''); // depth2 저장

      if (depth2.split('__').length > 1) {
        return depth1 + depth2.split('__')[0];
      } else {
        return depth1 + depth2;
      }
    }

    // 현재 URL의 depth3 값이 유효한지 체크하는 함수입니다.
    // depth2의 이름이 같을 수 있기 때문에 depth2의 '__' 여부만 체크하고 파일명을 전체를 비교합니다.
    function depth3Check(pathname) {
      var depth1 = pathname[pathname.length - 2], // depth1 저장
        depth2 = pathname[pathname.length - 1].replace('.html', '');

      if (depth2.split('__').length > 1) {
        return depth1 + depth2.split('__')[1];
      } else {
        return depth1 + depth2;
      }
    }

    // depth2와 depth3에서 각각 search(=parameter)값이 유효한지 체크하는 함수입니다.
    // 비교 대상이 되는 현재 URL과 a 태그의 href 값에 모두 search값이 있는 경우에만 비교합니다.
    function searchCheck(globalSearch, href) {
      var urlSearch = globalSearch !== '' ? true : false;
      var hrefSearch = href !== undefined && href.match('\\?') !== null ? (href.match('\\?').length > 0 ? true : false) : false;

      if (urlSearch && hrefSearch) {
        return true;
      } else {
        return false;
      }
    }
  };

  function boardCheck(pathname){
    var locView = pathname.indexOf('-view') > 0 ? true : false;
    var locWrite = pathname.indexOf('-write') > 0 ? true : false;
    var locPw = pathname.indexOf('-pw') > 0 ? true : false;
    var locEdit = pathname.indexOf('-edit') > 0 ? true : false;

    if ( locView ) {
      return [true, '-view']
    } else if ( locWrite ) {
      return [true, '-write']
    } else if ( locPw ) {
      return [true, '-pw']
    } else if ( locEdit ) {
      return [true, '-edit']
    } else {
      return false;
    }
  }
})(jQuery);
