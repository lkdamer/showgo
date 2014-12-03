$(document).ready( function () {
    // I only have one form on the page but you can be more specific if need be.
    var $form = $('form');

    $('#bottom-request-btn').click(function(e) {
      e.preventDefault();
      $('html,body').animate({
            scrollTop: 0}, 1000);
    });

    $('#learn-more-btn').click(function(e) {
      e.preventDefault();
      $('html,body').animate({
           scrollTop: $('#top-container').offset().top}, 1000);
    });


    if ( $form.length > 0 ) {
        $('form input[type="submit"]').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
             register($form);
        });
    }
});

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            // if data.result == error then show data.msg
            // need div for error message & style
            if (data.result == "error") {
              var errorMsg = data.msg.replace("0 - ", "");
              $(".error_msg").text(errorMsg);
            } else {
              $(".modal.fade").modal();
              $("#mce-EMAIL").val("");
              $(".error_msg").text("");
            }

        }
    });
  }
