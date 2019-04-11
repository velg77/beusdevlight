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

  $(document).ready(function() {
    $('.block-facet-blockacademic-programs .facet-item span').on('click', function(){
      if (!$(this).parent().parent().hasClass('active')) {
        $(this).parent().parent().closest('.item-list__links').find('.facets-widget-').slideUp();
        $(this).parent().parent().addClass('active');
        $(this).parent().next().slideDown();
      }
      else {
        $(this).parent().parent().removeClass('active');
        $(this).parent().next().slideToggle();
      }
    });

    $('.node-type-news .field--name-field-lead-text').append($('.addtoany_list'));
  });

  $('.pullquote').each(function() {
    $(this).parent().addClass('pullquote-processed');
    $(this).parent().prepend('<span class="pullquote-item">' + $(this).text() + '</span>');
  });

})(jQuery, Drupal, drupalSettings);
  