var parse = function(){
    $(".im_msg_text").each(function(index){
        text =  pgp.Decrypt($(this).text());
        if (text){
            $(this).text(text);
        }
    });
};

var buttonsource = "<div class='button_blue im_send_cont fl_l' ><button id='extcrypt-button'>Crypt</button></div>";
var cryptotype = "";
$(document).ready(function(){
    $("#im_send_wrap").prepend( buttonsource);
    $("#extcrypt-button").click(function(){
        chrome.storage.sync.get({
            publicKey: '',
            privateKey: '',
            passphrase: '',
            type: 'no'
        }, function(items) {
            cryptotype = items.type;
        });

       /* if (cryptotype == "pgp"){

            if (text){
                $("#im_editable").text(text);
            } else {
                alert("Encrypting error!");
            }
        }*/
        if (cryptotype == "ots"){
            console.log("ots");
        }
    });
    setTimeout(parse, 1000);
});