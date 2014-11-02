$(document).ready(function(){
    buttonsource = "<div class='button_blue im_send_cont fl_l' ><button id='extcrypt-button'>Crypt</button></div>"
    $("#im_send_wrap").prepend( buttonsource);
    $("#extcrypt-button").click(function(){
        $.ajax({
            url: "https://onetimesecret.com/api/v1/status",
            type: "GET",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa("alphakun88@gmail.com" + ":" + "073bc6f06219ca0d82bc63ee4218a6ff7747bb9c"));
            },
            success: function (data) {
                confirm(JSON.stringify(data));
            },
            error: function(data){
                alert(JSON.stringify(data));
            }

        });
    });
});