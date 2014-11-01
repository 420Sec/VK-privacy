var presend = function(){
    alert("push");
    if ($("#extcrypt-select").val() == 'pgp'){
        $(".im_editable").text("pgp");
    }

    if ($("#extcrypt-select").val() == 'ots'){
        $(".im_editable").text("ots");
    }
}
$(document).ready(function(){
    selectsource = "<select id='extcrypt-select' style='width: 50px;'><option value='no'>no</option><option value='pgp'>pgp</option><option value='ots'>ots</option></select>";
    $("#im_user_holder").append(selectsource);
    $("#im_send").attr("onClick","presend(); " + $("#im_send").attr("onClick"));
    /*$("#extcrypt-button").click(function(){
        if ($("#extcrypt-select").val() == 'pgp'){
            $(".im_editable").text("pgp");
        }

        if ($("#extcrypt-select").val() == 'ots'){
            $(".im_editable").text("ots");
        }
    });*/
});