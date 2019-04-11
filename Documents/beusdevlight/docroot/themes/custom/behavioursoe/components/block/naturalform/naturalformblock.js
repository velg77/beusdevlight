(function ($, Drupal, drupalSettings) {
    var setList;
    var temp1;
    var temp2;
    var rediecturl;
    Drupal.behaviors.generalAccessData = {
        attach: function (context) {
             setList = drupalSettings.generalparent_tree;
            //  console.log(setList);
        }
    };
    var locations = drupalSettings.generalparent_tree;
    var student_category = $('#child1').val();
    if (student_category != '-none-') {
        $('#child1').prepend($("<option value='-none-' selected='selected'>Choose an option</option>"));
        
    }
    $('#child2_chosen').css( "pointer-events"," none;" );
    $('#child1').change(function () {
        var country = $(this).val(),
            lcns = locations[country] || [];
            temp1 = country;
            console.log("country---11111----",country);
        $('#child2').html("");
        $('#child2').append($("<option value='-none-' selected='selected'>Choose an option</option>"));
        $.each(lcns.child, function (key, value) {
            $('#child2').append($("<option></option>").attr("value", key).html(value));
        });
        $("#child2").trigger("chosen:updated");
    if ($('#child1').val() != '-none-') {
        $('#child2_chosen').css('pointer-events','auto');
        
    }
    else{
        $('#child2_chosen').css('pointer-events','none');
        if ($('#child2').val() != '-none-') {
            $('#child3_chosen').css('pointer-events','auto');
        }
        else{
            $('#child3_chosen').css('pointer-events','none');
        }
    }
    });

    $('#child2').change(function () {
        var country = $('#child1').val(),
            lcns = locations[country] || [];
        var cities = $(this).val(),
            lcns1 = lcns[cities] || [];
            temp2 = cities;
        $('#child3').html("");
        $('#child3').append($("<option value='-none-' selected='selected'>Choose an option</option>"));
        $.each(lcns1.subchild, function (key, value) {
            $('#child3').append($("<option></option>").attr("value", key).html(value.name));          
            
        });
        $("#child3").trigger("chosen:updated");
    if ($('#child2').val() != '-none-') {
        $('#child3_chosen').css('pointer-events','auto');
    }
    else{
        $('#child3_chosen').css('pointer-events','none');
    }
    });
    $('#child3').change(function () {
        var country = $(this).val(),
        lcns = locations[country] || [];
        var cities = $(this).val(),
        lcns1 = lcns[cities] || [];
        
        rediecturl=setList[temp1][temp2].subchild[cities].url
        $('#general-admission-form').attr('action',rediecturl);
        if(rediecturl != undefined){
            $('#edit-submit-label').css('pointer-events','auto');
            // window.location.href="https://jsonlint.com/";

        }
    });
   
})(jQuery, Drupal, drupalSettings);