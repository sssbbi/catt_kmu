'use strict';

/* 
  퍼블팀 js 파일입니다. 
  
  ※ 퍼블팀 외에 수정금지
  개발에서 필요한 부분은 dev.js 파일에 작업 부탁드리며, 
  common.js에서 삭제 필요한 부분은 퍼블팀에 따로 전달 부탁드립니다.
  
*/


/* 모달팝업 */
var startPop = function() {
  var winW = $(window).width();
  if (winW > 1024) {
    $('.start_pop').draggable({
      handle: '.modal-header',
      containment: 'html'
    });
  }
}

/* loading image */
$(window).on('load', function(){
  $('.loading-image').fadeOut(300);
}); 


/* 모바일 네비게이션 */
var navMobile = {
  init: function () {
    this.nav_mobile_btn(); // 모바일네비 토글
    //this.nav_mobile_active(); //활성화된 메뉴 열어두기
    //this.nav_mobile_down(); //하위메뉴가 있는 항목 찾아서 addClass
    this.nav_mobile_action(); // 아코디언 메뉴
  },
  nav_mobile_btn: function () {
    var $navBtn = $('.nav-mobile__btn'),
      $navBg = $('.nav-mobile__bg'),
      $nav = $('.nav-mobile');
    var toggleNav = function () {
      $navBg.fadeToggle(200,"linear");
      $nav.fadeToggle(200, "linear");
    };
    $navBtn.on('click', function () {
      toggleNav();
    });
    $navBg.on('click', function () {
      toggleNav();
    });
  },
  nav_mobile_active: function () {
    //활성화된 메뉴 열어두기(1depth)
    // $('.nav-mobile .depth-1 > .link.on').next('.nav-list--depth2').show();
    // $('.nav-mobile .depth-1 > .link.on').addClass('active');
    $('.nav-mobile .depth-1 > .link.on,.nav-mobile .depth-2 > .link.on').addClass('active').next().show();
  },
  nav_mobile_down: function () {
    // 하위메뉴가있는 메뉴에 드롭다운 표시를 위한 클래스 붙이기
    $('.nav-mobile .depth-1, .nav-mobile .depth-2').each(function () {
      if ($(this).children('').next().length > 0) {
        $(this).addClass('_down');
      } else {
        $(this).removeClass('_down');
      }
    });
  },
  nav_mobile_action: function () {
    var $navBtn = $('.nav-mobile__btn'),
      $navBg = $('.nav-mobile__bg'),
      $nav = $('.nav-mobile'),
      $depth1 = $('.nav-mobile .depth-1');

    var toggleNav = function () {
      $navBg.hide();
      $nav.hide();
    };

    $depth1.children('.link').click(function () {
      toggleNav();
    });
  },
};


/* Magnific 팝업 */
var magnificPop = {
  init: function () {
    this.ajax(); //ajax 팝업
  },
  ajax: function () {
    $('.popup-link').magnificPopup({
      type: 'ajax',
      closeOnBgClick: false,
      mainClass: 'mfp-fade',
      callbacks: {
        ajaxContentAdded: function () {
          var $content = $(this.content[0]);
          var $pop = $content.find('.popup-in-popup');
          var aURL = '';

          if ($pop.length > 0) {
            aURL = $pop.attr('href');

            $pop.on('click', function (e) {
              e.preventDefault();

              $.ajax({
                url: aURL,
                dataType: 'html',
                success: function (data) {
                  var item = '<div class="pop-in-pop">';
                  item += data;
                  item += '</div>';

                  /* HTML append */
                  $content.append(item);

                  /* 닫기 버튼 append */
                  $('.pop-in-pop').children().append('<div class="pop-in-close"><i class="xi-close"></i></div>');

                  /* 닫기 버튼 */
                  $('.pop-in-close').on('click', function(){
                    $('.pop-in-pop').remove();
                  });
                }
              });
            });
          }
        }
      }
    }, 500);
  },
};

function closePopup() {
  $.magnificPopup.close();
}

function headerScroll() {
  if ($(window).scrollTop() > 0) {
    $('.header').addClass('scroll');
  } else {
    $('.header').removeClass('scroll');
  }
}


$(document).on('mouseover', function () {
  magnificPop.init();
});

$(window).on('scroll', function(){
  headerScroll();
})

$(document).ready(function () {
  /* Navigation Active */
  $('.nav, .nav-mobile').navActive({
    depth1: '.depth-1',
    depth2: '.depth-2',
    depth3: '.depth-3',
    activeClass: 'on',
    callback: function () {
      // console.log('callback function');
    },
  });

  /* 
  $('[data-track]').scrollTrack({
    threshold: 0, // // 임계치 ( * 상단 고정영역 높이 )
    activeClass: 'active', // 활성 클래스 네이밍 (기본값 : active)
  });
  */

  
  $(window).scrollTrack({
    threshold: 0, 
    activeClass: 'active',
  });
 

  //gnbdrop.init();
  navMobile.init();
  headerScroll();
  startPop();

  var wowJS = new WOW().init(); 

  /* Bullet List */
  $('.bullet-list').each(function () {
    if ($(this).hasClass('bullet-list--decimal')) {
      $(this).children('.item').each(function (index) {
        $(this).prepend('<span class="decimal-number">' + (index + 1) + '</span>');
      });
    }

    $(this).addClass('bullet-type--js');
  });
  
  /*
  min-width지정 rowscroll
  */
  $('.row-scrollwrap').each(function () {
    var $rowScrollTxtWidth = $(this).data('show'),
      $rowScrollTxt = $(this).find('.row-scrollwrap__txt');
    $(this).find('.row-scrollwrap__content').css('min-width', $rowScrollTxtWidth);
    // 가로스크롤 영역 min-width지정
    var $gutter = 40; // $container-gutter-width (_var.scss)
    if ($(window).width() < $rowScrollTxtWidth + $gutter) { 
      $rowScrollTxt.show();
      // 지정된 rowScrollTxtWidth + (gutter) 해상도에서 안내문구 노출
    }
  });

  /* scrollbar js */
  $('.scrollbar-inner').scrollbar();
  // $('.scrollbar-outer').scrollbar();
  // $('.scrollbar-light').scrollbar();

  /* Resizing Check */
  var resizing = resizingCheck({
    breakpoints: {
      414: function () {
        // console.log('414 < width < 768');
      },
      768: function () {
        // console.log('768 < width < 1024');
      },
      1024: function () {
        // console.log('1024 < width < 1200');
      },
      1200: function () {
        // console.log('1200 < width');
      },
    },
  });
});



/* File Upload */
$(document).on('change', '.file-box input[type="file"]', function () {
  var tmp = $(this).val().replace(/^.*\\/, "");
  $(this).parents('.file-box').find('.file-box__text').text(tmp);
  $(this).parents('.file-box').find('.file-box__text').addClass('on');
});

/* File Upload - 구버전 */
$(document).on('change', '.file_box input[type="file"]', function () {
  var tmp = $(this).val().replace(/^.*\\/, "");
  $(this).siblings("p").text(tmp);
});