(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.listing = {
    attach: function (context, settings) {
      /**
       *  Filters
       */
      $('.form-checkbox').each(function () {
        if ($(this).prop("checked") == true) {
          $('.filter-chip').css('display', 'block');
          $('.filter-lists').append(`<span tabindex="0" class="f-chips" id="${jQuery(this).val()}">${jQuery (this).next('label').text()} <a href="#removefilter" title="Remove" class="singlecancle">X</span></span>`);
          if ($('.f-chips').length) {
            $('.grd-lst').addClass('fil-sel');
          } else {
            $('.grd-lst').removeClass('fil-sel');
          }
        }
      });

      var showtxt = (($("select[name='sort_order'] option:selected").val() == "DESC") ? $('.drop-down .options ul li a#0').text() : $('.drop-down .options ul li a#1').text());
      $(".drop-down .sel-link").text(showtxt);
      $(".drop-down .sel-link").attr('title', showtxt);

      $(document).on('click', '.drop-down .selected', function (e) {
        e.preventDefault();
        $(".drop-down .options ul").css("display","block");
      });
      $(document).on('click', '.drop-down .options ul li a', function (e) {
        e.preventDefault();
        var text = $(this).html();
        var id = $(this).attr('id');
        $(".drop-down .sel-link").text(text);
        $(".drop-down .sel-link").attr('title', text);
        $(".drop-down .options ul").hide();
        if (id == 0) {
          $('select[name="sort_order"] option:eq(2)').prop('selected', false);
          $('select[name="sort_order"] option:eq(1)').prop('selected', true);
          $('.form-actions input').trigger("click");
        } else {
          $('select[name="sort_order"] option:eq(1)').prop('selected', false);
          $('select[name="sort_order"] option:eq(2)').prop('selected', true);
          $('.form-actions input').trigger("click");
        }
      });
      $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("drop-down")) {
          $(".drop-down .options ul").hide();
        }
      });
    }
  };

  var setList;

  $(document).on('click', '.filterbtn', function (e) {
    e.preventDefault();
    $('.filter-lists').text('');
    $('.form-actions input').trigger("click");
  })
  $(document).on('click', '.singlecancle', function (e) {
    e.preventDefault();
    var clearfit = $(this).parent().attr('id');
    $('.form-checkbox').each(function () {
      if ($(this).prop("checked") == true) {
        if (clearfit == $(this).attr('value')) {
          $(this).prop("checked", false);
          $('.form-actions input').trigger("click");
        }
      }
    });
  });
  $(document).on('click', '.newsfilter', function (event) {

    event.preventDefault();
    $('.view-filters').css('display', 'block');
    $('#filtby').focus();
    $('.form-checkboxes .bef-toggle').addClass('hd');
    var current = 1;
    $('fieldset .fieldset-legend').each(function () {
      $(this).append('<span class="chk-al"><input type="checkbox" id="filter' + current + '"  value="filter' + current + '" class="form-checkbox"><label for="filter' + current + '" class="selct-all"></label></span>');
      current++;
    });
    $('.fieldset-wrapper').trigger('click');
  })

  $(document).on('click', '.views-exposed-form .close', function (event) {

    $('.clrall').trigger('click');

    event.preventDefault();
    $('.view-filters').css('display', 'none');
    $('.chk-al').remove();
  });

  $(document).keydown(function (e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
      $('.views-exposed-form .close').click();
      $(".drop-down .options ul").hide();
    }
  });

  $(document).on('click', 'fieldset .selct-all', function (event) {
    $(this).closest('.form-item').find('.bef-toggle').trigger("click");
    var totchkbox = $(this).parents('legend').next().find('.form-checkbox').length;
    var chktotchkbox = $(this).parents('legend').next().find('.form-checkbox:checked').length;

  console.log("totchkbox===>",totchkbox);
  console.log("chktotchkbox===>",chktotchkbox);

     if(totchkbox === chktotchkbox){
      $(this).prop("checked",true);
     }
     else{
      $(this).prop("checked",false);
     }

  });

  $(document).on('click', '.selall', function (event) {
    event.preventDefault();
    $('.selct-all').each(function () {
      $(this).prev('input:checkbox:checked').prop("checked", true)
      if($(this).prev('input:checkbox:checked').length == 1){
        $(this).trigger('click');
      }
      $(this).trigger('click');
    });
    $('.fieldset-wrapper .form-checkbox').prop("checked", true);
  });

  $(document).on('click', '.clrall', function (event) {
    event.preventDefault();
    $('.selct-all').each(function () {
      console.log($(this).prev('input:checkbox:checked').length);
      $(this).prev('input:checkbox:checked').prop("checked", true)
      if($(this).prev('input:checkbox:checked').length == 1){
        $(this).trigger('click');
      }
      // $(this).trigger('click');
    });
    $('.form-checkbox').prop("checked", false);
  });

  $(document).on('click', '.fieldset-wrapper', function (event) {


     var totchkbox = $(this).find('.form-checkbox').length;
     var chktotchkbox = $(this).find('.form-checkbox:checked').length;
     if(totchkbox === chktotchkbox){
      //  console.log("IFFF---",$(this).prev('legend').find('.form-checkbox').prop("checked"));
       if($(this).prev('legend').find('.form-checkbox').prop("checked")== false){
       $(this).prev('legend').find('.form-checkbox').prop("checked",true);


          // console.log("$(this).find('.bef-toggle').text();---",$(this).find('.bef-toggle').text())

          // console.log("IFFF---",$(this).prev('legend').find('.form-checkbox').prop("checked"));
       }
     }
     else{
      $(this).prev('legend').find('.form-checkbox').prop("checked",false);
     }

  });


  $(document).on('click', '.button-dropdown', function () {
    $('.dropdown-menu').toggleClass("active");
    $('.dropdown-toggle').toggleClass("active");
  });



  //For Mobile Menu in Directory & Rooms Page
  var crntpage = $('.mnu_bar .menu-item--active-trail').text().trim();
  $("<li class='button-dropdown'><a href='javascript:void(0)' class='dropdown-toggle'>" + crntpage + "</a> <ul class='dropdown-menu'></ul></li>").appendTo(".mnu_bar div [role='navigation']");
  // Populate dropdown with menu items
  $(".mnu_bar .menu-item a").each(function () {

    var el = $(this);
    if ($(this).parent().hasClass('menu-item--active-trail')) {
      $("<li><a href='" + el.attr('href') + "'>" + el.text() + "</a></li>").appendTo(".mnu_bar .dropdown-menu");
    } else {
      $("<li><a href='" + el.attr('href') + "'>" + el.text() + "</a></li>").appendTo(".mnu_bar .dropdown-menu");
    }
  });



  $(document).on('click', '.exp-ico', function () {
    if ($(this).closest('tr').find('.crs-body').hasClass('active')) {
      $(this).removeClass('active');
      $(this).closest('tr').find('.crs-body').removeClass('active');
      $(this).closest('tr').css({
        'background': 'transparent',
      })
    } else {
      $(this).addClass('active');
      $(this).closest('tr').find('.crs-body').addClass('active');
      $(this).closest('tr').css({
        'background': '#f2f8ff',
      })
    }
  });


  $(document).on('click', '.acor-bdy .exp-ico', function () {
    if ($(this).parent().next('.crs-body').hasClass('active')) {
      console.log("ifff");
      $(this).removeClass('active');
      $(this).parent().next('.crs-body').removeClass('active');
      $(this).parentsUntil('.views-row').css({
        "background": "transparent"
      });
    } else {
      $(this).addClass('active');
      $(this).parent().next('.crs-body').addClass('active');
      $(this).parentsUntil('.views-row').css({
        "background": "#f2f8ff"
      });
    }
  });

  $(document).on('click', '.acrd-faq .exp-ico', function () {
    if ($(this).parent().next('.acrd-wrp').hasClass('active')) {
      console.log("ifff");
      $(this).removeClass('active');
      $(this).parent().next('.acrd-wrp').removeClass('active');
      $(this).closest('.views-row').css({
        "background": "transparent"
      });
    } else {
      $(this).addClass('active');
      $(this).parent().next('.acrd-wrp').addClass('active');
      $(this).closest('.views-row').css({
        "background": "#f2f8ff"
      });
    }
  });




  $(document).on('click', '.block-region-left-sidebar .facets-widget-links .facet-item a span', function () {

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
  });

  // For Grid List view
  $(document).on('click', '.tb-grd.events .fa-list-ul', function () {
    $('.tb-grd .fas').removeClass('active');
    $(this).addClass('active');
    $('.tabgrd').addClass('list-view');

    $('.lst-header').remove();
    $('.tabgrd .view-content .views-row:first-child').prepend('<div class=lst-header><div class="hdr-date field--name-field-event-start-date">Date</div><div class="hdr-date field--name-node-title">Event Description</div><div class="field--name-field-display-event-time hdr-time">Time</div><div class="field--name-field-events-type hdr-type">Type</div><div class="field--name-dynamic-token-fieldnode-events-tags-list-view hdr-topic">Topic</div></div>');

  });

  $(document).on('click', '.tb-grd.events .fa-th', function () {
    $('.tb-grd .fas').removeClass('active');
    $(this).addClass('active');
    $('.tabgrd').removeClass('list-view');
  });


  $(document).on('click', '.tb-grd.rooms .fa-list-ul', function () {
    $('.tb-grd .fas').removeClass('active');
    $(this).addClass('active');
    $('.tabgrd').addClass('list-view');
    $('.lst-header').remove();
    $('.tabgrd .view-content .views-row:first-child').prepend('<div class=lst-header><div class="hdr-name field--name-node-title">Name or number</div><div class="hdr-seating">Seating</div></div>');

  });

  $(document).on('click', '.tb-grd.rooms .fa-th', function () {
    $('.tb-grd .fas').removeClass('active');
    $(this).addClass('active');
    $('.tabgrd').removeClass('list-view');
  });

   $('.light_blue .block:first-child').addClass('active');
  $(document).on('click', '.light_blue .block', function () {
    $('.light_blue .block').removeClass('active');
    var crntxt = $.trim($(this).text().replace(/ /g, ''));
    if (crntxt == "Overview&Requirements" || crntxt == "OverviewandRequirements") {
      $(this).addClass('active');
      $('.con-apply').fadeOut();
      $('.con-career').fadeOut();
      $('.con-overview').fadeIn();
    } else if (crntxt == "Applying") {
      $(this).addClass('active');
      $('.con-apply').fadeIn();
      $('.con-career').fadeOut();
      $('.con-overview').fadeOut();
    } else if (crntxt == "CareersandInternships") {
      $(this).addClass('active');
      $('.con-apply').fadeOut();
      $('.con-career').fadeIn();
      $('.con-overview').fadeOut();
    }
  });



  $(document).ready(function () {
    // ** Concentration Page Sample Curriculam ** //
    $(".form-item-field-academic-year-target-id .form-select option").each(function (index) {
      var fldname = $(this).text();
      var fldval = $(this).val();
        $('.cur-bdy .group-left').append('<div class="field-item" id="' + fldval + '">' + fldname + '</div>');
    });

 // ** Concentration Page ENDORSEMENT AREAS ** //
    $(".form-item-field-endorsement-areas-target-id .form-select option").each(function (index) {
      var fldname = $(this).text();
      var fldval = $(this).val();
        $('.endor-bdy .group-left').append('<div class="field-item" id="' + fldval + '">' + fldname + '</div>');
    });

    $('.concen .group-left .field-item:first-child').addClass('active');
    $(document).on('click', '.concen .field-item', function (e) {
      $('.field-item').removeClass('active');
      $(this).addClass('active');
      $(".concen .form-select").val($(this).attr('id'));
      $('.form-submit').trigger('click');
      // e.preventDefault();
    });

  })
  //End



})(jQuery, Drupal, drupalSettings);
