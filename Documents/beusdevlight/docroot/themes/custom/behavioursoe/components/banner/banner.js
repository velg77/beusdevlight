(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.listing = {
      attach: function (context, settings) {

    	}
    }
    
    /**Slick Slider for banner */
    $(document).ready(function() {
      $('.field--name-field-banner-slider').each(function(){
        if ($(this).children('.field__item').length > 1) {
          $(this).children('.field__item').find('.group-right').prepend('<div class="slck-lft slck-arw"></div>');
          $(this).children('.field__item').find('.group-right').append('<div class="slck-rgt slck-arw"></div>');
          $('.field--name-field-banner-slider').slick({
            dots: true,
            autoplay: true,
          });
        }    
        $('.slck-lft').on('click', function(){          
          $(this).closest('.slick-list').siblings('.slick-prev').trigger( "click" );
        });
        $('.slck-rgt').on('click', function(){          
          $(this).closest('.slick-list').siblings('.slick-next').trigger( "click" );
        });  
      });           
    });

  })(jQuery, Drupal, drupalSettings);
  