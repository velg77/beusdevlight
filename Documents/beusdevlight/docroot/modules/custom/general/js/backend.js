(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.backend = {
    attach: function (context, settings) {
      if($('#edit-field-show-manual-entry-value:checked').length) {
        $('.field--name-field-related-news, .field--name-field-related-impact-stories, .field--name-field-related-events').addClass('enab');
      }
      $('#edit-field-show-manual-entry-value').change(function() {
        if($(this).is(":checked")) {
          $('.field--name-field-related-news, .field--name-field-related-impact-stories, .field--name-field-related-events').addClass('enab');
        } else {
          $('.field--name-field-related-news, .field--name-field-related-impact-stories, .field--name-field-related-events').removeClass('enab');
        }
      });
      $('.view.eb-media .view-content').css('max-height', $('.view.eb-media .view-content').width()/2);
    }
  };

}(jQuery, Drupal, drupalSettings));