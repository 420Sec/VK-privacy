console.log("script start");
$(document).ready(function(){
    console.log("document ready");
    var buttonsource = "<div class='button_blue im_send_cont fl_l' style='width: 50px; margin-top: 6px;'><button id='extcrypt-button' style='width: 50px;' onclick='createPGPwindow();'>PGP</button></div>";
    $("#im_user_holder").append(buttonsource);
    console.log("button added");
    $.get(chrome.extension.getURL('/injected.js'),
        function(data) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = data;
            document.getElementsByTagName("head")[0].appendChild(script);
            document.getElementsByTagName("body")[0].setAttribute("onLoad", "injected_main();");
        }
    );
    console.log("Script injected");
});
