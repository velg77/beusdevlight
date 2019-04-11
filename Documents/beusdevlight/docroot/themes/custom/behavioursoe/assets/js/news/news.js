// // Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


(function ($, Drupal, drupalSettings) {

    $('.newsfilter').click(function(){
      
    });

    $(document).on('click', '.newsfilter', function(event) {
      $('.view-filters').css('display','block');
      $('.form-checkboxes .bef-toggle').addClass('element-invisible');
      // js-form-wrapper form-wrapper
       $('#edit-field-news-type--wrapper .fieldset-legend').append('<input type="checkbox" id="selectall-news"  value="1" class="form-checkbox"><label for="selectall-news" class="selct-all"></label>');
       $('#edit-field-tags--wrapper .fieldset-legend').append('<input type="checkbox" id="selectall-media"  value="1" class="form-checkbox"><label for="selectall-media" class="selct-all"></label>');

    })
    $(document).on('click', '.views-exposed-form .close', function(event) {
      $('.view-filters').css('display','none');
    });


$(document).on('click', 'fieldset .selct-all', function(event) {

  $(this).closest('.form-item').find('.bef-toggle').trigger("click");

  // if(this.checked) {
  //   $(this).closest('.form-item').find('.bef-toggle').trigger("click");
  // }
  // else{
  // $(this).closest('.form-item').find('.bef-toggle').trigger("click");

  // }

});
$(document).on('click', '.selall', function(event) { 
  $('.form-checkbox').trigger("click");
});
$(document).on('click', '.clrall', function(event) { 
var checkedVal= $('.form-checkbox').attr('checked');
});
// $(document).on('click', 'fieldset .selct-all2', function(event) {

//   console.log("clicked");

//   if(this.checked) {
//     $(this).closest('.form-item').find('.bef-toggle').trigger("click");
//     console.log("checked");
//   }
//   else{
//   $(this).closest('.form-item').find('.bef-toggle').trigger("click");
//   console.log("not checked");
//   }

// });


  })(jQuery, Drupal, drupalSettings);
