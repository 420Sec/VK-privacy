var cryptoMode = false;
console.log("START");
require("pgpvkchat.js");
$(document).ready(function(){
    console.log("document ready");
    var buttonsource = "<div class='button_blue im_send_cont fl_l' style='width: 50px; margin-top: 6px;'><button id='extcrypt-button' style='width: 50px;'>PRIV</button></div>";
    $("#im_user_holder").append(buttonsource);
    console.log("button added");
    $("#extcrypt-button").click(function(){
        pgpChat.init();
    });
    console.log("cryptoMode = " + cryptoMode);
});