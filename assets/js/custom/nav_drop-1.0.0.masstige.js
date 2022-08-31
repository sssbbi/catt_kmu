/*
 *
 * Navigation Dropdown Plugin version 1.1.6
 * Made By Masstige Publishing Team
 *
 * */
'use strict';

(function ($) {
  $.fn.navDrop = function (options) {
    var settings = $.extend(
      {
        type: undefined, // 기본값 udnefiend, 선언하지 않거나 없는 값을 선언할 경우 콘솔창에 경고문구 출력
        background: true, // 기본값 true, 배경 엘리먼트가 없을 경우 콘솔창에 경고문구 출력
        backgroundClass: '.nav__bg', // 기본값 .nav__bg
        backgroundAutoColor: false, // 기본값 false, depth2의 배경색을 자동으로 적용
        effect: 'fade', // 기본값 fade, 옵션값은 fade, slide
        delay: 200, // 출력시 delay
        callback: function () {}, // 콜백 함수
      },
      options
    );

    var TYPE = validateCheck(settings.type), // 옵션 타입 ( cf. 하단 validateCheck 함수 참고 )
      $THIS = validateCheck($(this)), // navDrop이 선언된 엘리먼트
      $NAV = validateCheck($THIS.find('.nav')), // .nav
      $NAV_1 = validateCheck($THIS.find('.nav .depth-1')), // .depth-1
      $NAV_LINK = validateCheck($THIS.find('.nav .depth-1').children('.link')), // .depth-1 .link
      $NAV_DROP = validateCheck($THIS.find('.nav .nav-list--depth2')), // .nav-list--depth2
      $BG = validateCheck($(settings.backgroundClass)),
      BG_COLOR = settings.backgroundAutoColor,
      EFFECT = validateCheck(settings.effect),
      DELAY = settings.delay === 0 ? 0 : validateCheck(settings.delay);

    switch (TYPE) {
      case 'all': // 타입이 all인 경우
        $NAV.addClass('gnb-drop--all'); // 해당 클래스 .nav에 추가

        /* Backgorund active */
        if (settings.background) {
          backgroundActive($THIS);
        }

        $NAV_1.on('mouseover focus', function () {
          $NAV_1.removeClass('hover');
          $(this).addClass('hover');
        });

        $NAV_1.on('mouseleave', function () {
          $(this).removeClass('hover');
        });

        $NAV_LINK.each(function (index) {
          $(this).on('mouseover focus', function () {
            $THIS.addClass('gnb-hover');
            if ( EFFECT === 'fade' ) {
              $NAV_DROP.stop(false, true).fadeIn(DELAY);
            } else if ( EFFECT === 'slide' ) {
              $NAV_DROP.stop(false, true).slideDown(DELAY);
            }
          }); 
        });

        $THIS.on('mouseleave', function () {
          $THIS.removeClass('gnb-hover');
          if ( EFFECT === 'fade' ) {
            $NAV_DROP.stop(false, true).fadeOut(DELAY);
          } else if ( EFFECT === 'slide' ) {
            $NAV_DROP.stop(false, true).slideUp(DELAY);
          }
        });

        break;
      case 'each': // 타입이 each인 경우
        $NAV.addClass('gnb-drop--each'); // 해당 클래스 .nav에 추가

        $NAV_1.on('mouseover focus', function () {
          $NAV_1.removeClass('hover');
          $(this).addClass('hover');
        });

        $NAV_1.on('mouseleave', function () {
          $(this).removeClass('hover');
        });

        $NAV_LINK.each(function (index) {
          $(this).on('mouseover focus', function () {
            if ($(this).next().length > 0) {
              if ( EFFECT === 'fade' ) {
                $NAV_DROP.stop(false, true).fadeOut(DELAY);
                $(this).next().stop(false, true).fadeIn(DELAY);
              } else if ( EFFECT === 'slide' ) {
                $NAV_DROP.stop(false, true).slideUp(DELAY);
                $(this).next().stop(false, true).slideDown(DELAY);
              }
            } else {
              if ( EFFECT === 'fade' ) {
                $NAV_DROP.stop(false, true).fadeOut(DELAY);
              } else if ( EFFECT === 'slide' ) {
                $NAV_DROP.stop(false, true).slideUp(DELAY);
              }
            }
          });
        });

        $NAV.on('mouseleave', function () {
          if ( EFFECT === 'fade' ) {
            $NAV_DROP.stop(false, true).fadeOut(DELAY);
          } else if ( EFFECT === 'slide' ) {
            $NAV_DROP.stop(false, true).slideUp(DELAY);
          }
        });

        /* Backgorund active */
        if (settings.background) {
          backgroundActive($THIS);
        }

        break;
      case 'line': // 타입이 line인 경우
        $NAV.addClass('gnb-drop--line');

        $NAV_1.on('mouseover focus', function () {
          $NAV_1.removeClass('hover');
          $(this).addClass('hover');
        });

        $NAV_1.on('mouseleave', function () {
          $(this).removeClass('hover');
        });

        $NAV_LINK.each(function (index) {
          $(this).on('mouseover focus', function () {
            if ($(this).next().length > 0) {
              $NAV_DROP.stop(false, true).hide();
              $(this).next().stop(false, true).css('display', 'flex');
            } else {
              $NAV_DROP.stop(false, true).hide();
            }
          });
        });

        $NAV.on('mouseleave', function () {
          $NAV_DROP.stop(false, true).hide();
        });

        /* Backgorund active */
        if (settings.background) {
          backgroundActive($THIS);
        }

        break;
      default:
        console.warn('navDrop의 type 선언이 옳바르지 않습니다.');
        break;
    }

    /* Background Auto Color */
    if ( $BG && BG_COLOR ) {
      backgroundAutoColor();
    }

    /* Function Validation of Value ( 매개변수로 전달된 값의 유효성 체크 ) */
    function validateCheck(value) {
      var result = value !== undefined && value !== null ? value : false; // undefined, null 여부 우선 체크

      if ( result ) { // result 값이 유효한 경우
        if (value.context) { // 전달된 value가 자바스크립트 혹은 제이쿼리 객체인 경우
          return ( value.length > 0 ) ? value : false; // DOM 객체이기 때문에 length 값으로 유효성 체크
        } else {
          return result; // DOM 객체가 아니기 때문에 위의 result 값을 그대로 반환함
        }
      }
    }

    /* Function Background Active */
    function backgroundActive(target){ 
      if ( !$BG ) { // $BG가 없는 경우, validateCheck에서 유효성 체크 시 true/false로 반환하기 때문에 ! 구문 사용 가능
        console.warn(settings.backgroundClass+' 엘리먼트를 찾을 수 없습니다.'); // 경고문구 출력
        return false; // $BG가 없는 경우 함수 중단
      }

      var maxHeight = 0;

      $NAV_DROP.each(function(){
        if ($(this).outerHeight() > maxHeight) {
          maxHeight = $(this).outerHeight();
        }
      });

      $BG.outerHeight(maxHeight);

      switch (TYPE) {
        case 'all':
          $NAV_LINK.each(function (index) {
            $(this).on('mouseover focus', function () {
              $NAV_DROP.each(function(){
                if ($(this).outerHeight() > maxHeight) {
                  maxHeight = $(this).outerHeight();
                }
              });
        
              $BG.outerHeight(maxHeight);

              if ( EFFECT === 'fade' ) {
                $BG.stop(false, true).fadeIn(DELAY);
              } else if ( EFFECT === 'slide' ) {
                $BG.stop(false, true).slideDown(DELAY);
              }
            }); 
          });

          $THIS.on('mouseleave', function () {
            if ( EFFECT === 'fade' ) {
              $BG.stop(false, true).fadeOut(DELAY);
            } else if ( EFFECT === 'slide' ) {
              $BG.stop(false, true).slideUp(DELAY);
            }
          });

          break;
        case 'each': 
          $NAV_LINK.each(function (index) {
            $(this).on('mouseover focus', function () {
              $NAV_DROP.each(function(){
                if ($(this).outerHeight() > maxHeight) {
                  maxHeight = $(this).outerHeight();
                }
              });
        
              $BG.outerHeight(maxHeight);
              
              if ($(this).next().length > 0) {
                if ( EFFECT === 'fade' ) {
                  $BG.stop(false, true).fadeIn(DELAY);
                } else if ( EFFECT === 'slide' ) {
                  $BG.stop(false, true).slideDown(DELAY);
                }
              } else {
                if ( EFFECT === 'fade' ) {
                  $BG.stop(false, true).fadeOut(DELAY);
                } else if ( EFFECT === 'slide' ) {
                  $BG.stop(false, true).slideUp(DELAY);
                }
              }
            });
          });

          $NAV.on('mouseleave', function () {
            if ( EFFECT === 'fade' ) {
              $BG.stop(false, true).fadeOut(DELAY);
            } else if ( EFFECT === 'slide' ) {
              $BG.stop(false, true).slideUp(DELAY);
            }
          });

          break;
        case 'line':
          $NAV_LINK.each(function (index) {
            $(this).on('mouseover focus', function () {
              var $depth2 = $(this).next();
              var depth2Height = 0;

              if ($depth2.length > 0) {
                $depth2.stop(false, true).css('display', 'flex');
                depth2Height = $depth2.outerHeight();
                $BG.css('height', depth2Height);

                if ( EFFECT === 'fade' ) {
                  $BG.stop(false, true).fadeIn(DELAY);
                } else if ( EFFECT === 'slide' ) {
                  $BG.stop(false, true).slideDown(DELAY);
                }
              } else {
                if ( EFFECT === 'fade' ) {
                  $BG.stop(false, true).fadeOut(DELAY);
                } else if ( EFFECT === 'slide' ) {
                  $BG.stop(false, true).slideUp(DELAY);
                }
              }
            });
          });
  
          $NAV.on('mouseleave', function () {
            if ( EFFECT === 'fade' ) {
              $BG.stop(false, true).fadeOut(DELAY);
            } else if ( EFFECT === 'slide' ) {
              $BG.stop(false, true).slideUp(DELAY);
            }
          });

          break;
        default:
          break;
      }
    }

    function backgroundAutoColor() {
      $BG.css('background-color',$NAV_DROP.css('background-color'));
    }

    /* Callback */ 
    settings.callback();
  };
})(jQuery);
