var parse = function(){
    $(".im_msg_text").each(function(index){
        text =  CryptoGuy.Decrypt($(this).text());
        if (text){
            $(this).text(text);
        }
    });
}
$(document).ready(function(){
    buttonsource = "<div class='button_blue im_send_cont fl_l' ><button id='extcrypt-button'>Crypt</button></div>"
    $("#im_send_wrap").prepend( buttonsource);
    $("#extcrypt-button").click(function(){
        type = "";
        chrome.storage.sync.get({
            publicKey: '',
            privateKey: '',
            passphrase: '',
            type: 'no'
        }, function(items) {
            type = items.type;
        });
        if (type == "pgp"){
            text = CryptoGuy.Encrypt($("#im_editable").text());
            if (text){
                $("#im_editable").text(text);
            } else {
                alert("Encrypting error!");
            }
        }
    });
    setTimeout(parse, 1000);
});