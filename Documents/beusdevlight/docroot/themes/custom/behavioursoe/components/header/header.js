/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal, drupalSettings) {

'use strict';


/**
 * Visitor role Menu
 */
$('.vstr-role li a').attr('tabIndex', '3');
if($('.vstr-role > ul.menu > li.menu-item--active-trail').length) {
  $('.lnd-type .sel-role').text($('.vstr-role > ul.menu > li.menu-item--active-trail > a').text());
}
$('.lnd-type').on('click', function(e) {
  e.preventDefault();
  vstrroleshow();
});
$('.lnd-type, .vstr-role ul.menu').on('mouseenter', function(e) {
  vstrroleshow();
});
$('.lnd-type, .vstr-role ul.menu').on('mouseleave', function(e) {
  vstrrolehide();
});
$(document.body).on('mouseenter focus', '.blk-logo > a, .skip-link', function (e) {
  vstrrolehide();
});

/**
 * Menu Acccessibility
 */
$(document.body).on('mouseenter focus', '.main-menu .menu-level-0 > li.menu-item--expanded > a', function (e) {
  var el = $(this);
  el.closest('li.menu-item--expanded').toggleClass('has-focus');
  // Show sub-menu
  el.closest('.main-menu .menu-level-0 > li.menu-item--expanded').attr('data-menuitem', 'true');
  $("body").addClass('page-move-down');
}).on('mouseleave blur', '.main-menu .menu-level-0 > li.menu-item--expanded > a', function (e) {
  var el = $(this);
  el.closest('li.menu-item--expanded').toggleClass('has-focus');
  $("body").removeClass('page-move-down');
  // Only hide sub-menu after a short delay, so links get a chance to catch focus from tabbing
  setTimeout(function () {
    if (el.siblings('.menu-level-1').attr('data-has-focus') !== 'true') {
      el.closest('.main-menu .menu-level-0 > li.menu-item--expanded').attr('data-menuitem', 'false');
    }
  }, 100);
}).on('mouseenter focusin', '.main-menu .menu-level-1', function (e) {
  var el = $(this);
  el.attr('data-has-focus', 'true');
  $("body").addClass('page-move-down');
}).on('mouseleave focusout', '.main-menu .menu-level-1', function (e) {
  var el = $(this);
  setTimeout(function () {
    if (el.find(':focus').length === 0) {
      $("body").removeClass('page-move-down');
      el.attr('data-has-focus', 'false');
      if (el.closest('.main-menu .menu-level-0 > li.menu-item--expanded.has-focus').length === 0) {
        el.closest('.main-menu .menu-level-0 > li.menu-item--expanded').attr('data-menuitem', 'false');
      }
    }
  }, 100);
});

$('.header .bars').on('click', function(){
  if($('.hdr-btm').hasClass('active-menu')) {
  }
  else {
    $('.hdr-btm').addClass('active-menu');
  }
});

$('.header .cls-icon').on('click', function(){
  if($('.hdr-btm').hasClass('active-menu')) {
    $('.hdr-btm').removeClass('active-menu');
  }
});


$(window).resize(function(){
  menugutter();
});

menugutter();
mobileMenu();
hideSubmenu();
showSubmenu();

function vstrroleshow() {
  $('.vstr-role ul.menu').addClass("active");
  $('.lnd-type .role-opt').addClass('hd');
  $('.lnd-type .role-close').removeClass('hd');
}

function vstrrolehide() {
  $('.vstr-role ul.menu').removeClass("active");
  $('.lnd-type .role-opt').addClass('hd');
  $('.lnd-type .role-open').removeClass('hd');
}

function mobileMenu() {
  $('.main-menu').mobileMegaMenu();
}

function menugutter(){
  if($(window).width() > 1024){
    var win_width = $(window).width();
    var gutter_space = (win_width - 1110)/2;
    $('.main-menu > ul.menu > li.menu-item--expanded > ul.menu').css({
      'padding-left': gutter_space + 62,
      'padding-right': gutter_space + 62,
    })
    $('.vstr-role ul.menu').css('left', gutter_space);
  } else {
    $('.vstr-role ul.menu').css('left', 'auto');
  }
}

function hideSubmenu() {
  $('.main-menu .next-button').on('click', function(){
    if($(this).closest('ul.menu').hasClass('has-been-viewed')){
      $(this).closest('.hdr-btm').addClass('hd-submenu');
    }
  })

  if ($('.main-menu > ul.menu').hasClass('has-been-viewed') && $('.main-menu > ul.menu > li.menu-item > ul.menu').hasClass('is-in-view')){
    $('.hdr-btm').addClass('hd-submenu');
    console.log("true");
  }
}

function showSubmenu() {
  $('.main-menu .back-button').on('click', function(){
    if($(this).closest('ul.menu').parent().parent().hasClass('is-in-view')){
      $(this).closest('.hdr-btm').removeClass('hd-submenu');
    }
  })
}

$('.menu-level-0 > .menu-item').each(function() {
  if($(this).find('.field--name-field-image').length) {
    $(this).addClass('menu-vc-'+$(this).find('.field--name-field-image > .field__item').length);
    $(this).find('.menu-level-1').append('<li class="menu-item menu-item-vc">'+$(this).find('.field--name-field-image').html()+'</li>');
    $(this).find('.field--type-entity-reference.field--name-field-image').remove();
  }
});

/**
 *  Menu Sticky
 */
menu_stk();
$(window).scroll(function() {
  menu_stk();
});
function menu_stk() {
  if($(window).scrollTop() > 0) {
    $('body').addClass('menu-skd');
  } else {
    $('body').removeClass('menu-skd');
  }
}


})(jQuery, Drupal, drupalSettings);



// (function (Drupal) {
//   Drupal.behaviors.mainMenu = {
//     attach: function (context) {
//       'use strict';
//       console.log("Header JS test");

//     }
//   }

//   ///


// })(Drupal);
