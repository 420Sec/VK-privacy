$(document).ready(function(){
    buttonsource = "<div class='button_blue im_send_cont fl_l' ><button id='extcrypt-button'>Crypt</button></div>"
    $("#im_send_wrap").prepend( buttonsource);
    $("#extcrypt-button").click(function(){
        url = "";
        if ($("#extcrypt-select").val() == "ots"){
            alert("ots");
        }
        if ($("#extcrypt-select").val() == "pgp"){
            alert("pgp");
        }
    });
});