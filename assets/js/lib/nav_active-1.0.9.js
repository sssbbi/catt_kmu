(function ($){
  $.fn.navActive = function (options) {
    var settings = $.extend({
      type: "normal", // normal, scroll, fullpage
      root: undefined, // ex) /a/b/c/depth1/depth2.html 인 경우 /a/b/c 로 작성, ※ 도메인은 적을 필요 없습니다
      active: "on", // active class name ( 활성 클래스 이름 )
      depth1: ".depth-1", // depth1 classname ( 1뎁스 클래스 )
      depth2: ".depth-2", // depth2 classname ( 2뎁스 클래스 )
      depth3: ".depth-3", // depth3 classname ( 3뎁스 클래스 )
      language: undefined, // Multilingual ( 다국어 )
      standalone: { // Standalone Web ( 독립형 웹 )
        pc: undefined,
        mobile: undefined
      },
      callback: function(){} // 콜백함수
    }, options);


    if ( $(this).hasClass('nav-active-js') === false ) { // 스크립트 중복 적용 방지
      if ( settings.type === "normal" && $(this).hasClass('nav-active--normal') === false ) { // 스크립트 중복 적용 방지
        var PATHNAME = $(location).attr('pathname');

        /* Root path remove */
        var ROOT_PATH = settings.root !== undefined ? settings.root !== "" ? settings.root : undefined : undefined;
        PATHNAME = PATHNAME.replace(ROOT_PATH,'');

        /* Multilingual Check */
        var LANG = settings.language !== undefined ? settings.language.replace(/\s/gi,'').split(',') : undefined;

        for (let i in LANG) {
          PATHNAME = PATHNAME.replace('\/'+LANG[i],'');
        }

        /* Standalone Web Check */
        var STANDALONE = settings.standalone;

        for (let DEVICE in STANDALONE) {
          PATHNAME = STANDALONE[DEVICE] !== undefined ? PATHNAME.replace('\/'+STANDALONE[DEVICE],'') : PATHNAME;
        }
        
        // ** html 확장자도 수정 가능하도록 변경 
        var LOCATION = {
          DEPTH1: PATHNAME.match(/[^\.\/\s]+/) !== null ? PATHNAME.match(/[^\.\/\s]+/)[0].replace('.html','') : undefined,
          DEPTH2: PATHNAME.match(/[^\.\/\s]+\.[^\.\/\s]+/) !== null ? PATHNAME.match(/[^\.\/\s]+\.[^\.\/\s]+/)[0].replace('.html','') : undefined,
          DEPTH3: PATHNAME.match(/[^\.\/\s]+\__[^\.\/\s]+/) !== null ? PATHNAME.match(/[^\.\/\s]+\__[^\.\/\s]+/)[0] : undefined
        }

        // '__'(underscore)가 있는 경우 2depth, 3depth 값 변경
        if ( LOCATION.DEPTH3 !== undefined ) {
          var tempArray = LOCATION.DEPTH3.split('__');
          LOCATION.DEPTH2 = tempArray[0];
          LOCATION.DEPTH3 = tempArray[1];
        }

        if ( $(this).length > 0 ) {
          $(this).each(function(){
            var $DEPTH1 = $(this).find(settings.depth1);
            var $DEPTH2 = $(this).find(settings.depth2);
            var $DEPTH3 = $(this).find(settings.depth3);

            // '-'(hyphen)이 있는 경우 2depth 값 변경
            for (let DEPTH in LOCATION) {
              var validate = LOCATION[DEPTH] !== undefined ? LOCATION[DEPTH] !== null ? LOCATION[DEPTH] : false : false;

              if (validate && LOCATION[DEPTH].match(/[^\.\/\s]+[-][^\.\/\s]+/) !== null) {
                LOCATION[DEPTH] = LOCATION[DEPTH].split('-')[0]
              }
            }

            /* Depth1 Check */
            if ( $DEPTH1.length > 0 ) {
              $DEPTH1.each(function(){
                var $DEPTH1_LINK = $(this).children('a');
                var HREF_1 = $DEPTH1_LINK.attr('href');
                var PATH = {
                  DEPTH1: HREF_1.match(/[^\.\/\s]+/) !== null ? HREF_1.match(/[^\.\/\s]+/)[0].replace('.html','') : undefined
                }

                if ( LOCATION.DEPTH1 === PATH.DEPTH1 ) {
                  $DEPTH1_LINK.addClass('on');
                }
              });
            }

            /* Depth2 Check */
            if ( $DEPTH2.length > 0 ) {
              $DEPTH2.each(function(){
                var $DEPTH2_LINK = $(this).children('a');
                var HREF_2 = $DEPTH2_LINK.attr('href').replace('../','');
                var PATH_2 = {
                  DEPTH1: HREF_2.match(/[^\.\/\s]+/) !== null ? HREF_2.match(/[^\.\/\s]+/)[0].replace('.html','') : undefined,
                  DEPTH2: HREF_2.match(/[^\.\/\s]+\.[^\.\/\s]+/) !== null ? HREF_2.match(/[^\.\/\s]+\.[^\.\/\s]+/)[0].replace('.html','') : undefined
                }

                if ( LOCATION.DEPTH3 !== undefined ) {
                  var tempArray = PATH_2.DEPTH2.split('__');
                  PATH_2.DEPTH2 = tempArray[0];
                }

                if (LOCATION.DEPTH1+LOCATION.DEPTH2 === PATH_2.DEPTH1+PATH_2.DEPTH2) {
                  $DEPTH2_LINK.addClass('on');
                }
              });
            }

            /* Depth3 Check */
            if ( $DEPTH3.length > 0 ) {
              $DEPTH3.each(function(){
                var $DEPTH3_LINK = $(this).children('a');
                var HREF_3 = $DEPTH3_LINK.attr('href');
                var PATH_3 = {
                  DEPTH1: HREF_3.match(/[^\.\/\s]+/) !== null ? HREF_3.match(/[^\.\/\s]+/)[0].replace('.html','') : undefined,
                  DEPTH2: HREF_3.match(/[^\.\/\s]+\.[^\.\/\s]+/) !== null ? HREF_3.match(/[^\.\/\s]+\.[^\.\/\s]+/)[0].replace('.html','') : undefined,
                  DEPTH3: HREF_3.match(/[^\.\/\s]+\__[^\.\/\s]+/) !== null ? HREF_3.match(/[^\.\/\s]+\__[^\.\/\s]+/)[0] : undefined
                }

                if ( PATH_3.DEPTH3 !== undefined ) {
                  var tempArray = PATH_3.DEPTH3.split('__');
                  PATH_3.DEPTH2 = tempArray[0];
                  PATH_3.DEPTH3 = tempArray[1];
                }

                if (LOCATION.DEPTH1+LOCATION.DEPTH2+LOCATION.DEPTH3 === PATH_3.DEPTH1+PATH_3.DEPTH2+PATH_3.DEPTH3) {
                  $DEPTH3_LINK.addClass('on');
                }
              });
            }
          });
        }
      }

      if ( settings.type === "scroll" ) {
        var $NAV_ITEM = "";
        var $ACTIVE_ITEM = "";
      }
    }

    // initialized state addClass
    $(this).addClass('nav-active--'+settings.type).addClass('nav-active-js');

    options.callback();
  }
}(jQuery));


/* 선언문 */
$(document).ready(function(){
  $('.nav').navActive({
    type: "normal", // normal, scroll, fullpage ( ※ 추가 예정입니다. )
    root: "/a/b/c", // ex) /a/b/c/depth1/depth2.html 인 경우 /a/b/c 로 작성 ( ※ 도메인은 적을 필요 없습니다 )
    active: "on", // active class name ( 활성 클래스 이름 )
    depth1: ".depth-1", // depth1 classname ( 1뎁스 클래스 )
    depth2: ".depth-2", // depth2 classname ( 2뎁스 클래스 )
    depth3: ".depth-3", // depth3 classname ( 3뎁스 클래스 )
    language: "eng, chn", // Multilingual ( 다국어 )
    standalone: { // Standalone Web ( 독립형 웹 )
      pc: "pc", // PC를 구분하는 경우에 폴더명
      mobile: "m" // 모바일을 구분하는 경우에 폴더명
    },
    callback: function(){
      // 콜백 함수
    }
  });
});
