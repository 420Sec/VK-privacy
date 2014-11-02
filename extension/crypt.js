/**
 * Created by zekchan on 11/1/14.
 */
var PGPCrypter = function()
{
    this.openpgp = new openpgp();
        
    this.encrypt = function(message, successCallback, errorCallback)
    {
        var key = this.PublicKey;
        var publicKey = openpgp.key.readArmored(key);
        this.openpgp.encryptMessage(publicKey.keys, message).then(function(pgpMessage)
        {
            successCallback(pgpMessage);
        }).catch(function(error)
        {
            errorCallback(error);
        });
    };

    this.decrypt = function(cryptedMessage, successCallback, errorCallback)
    {
        var key = this.config.privateKey;
        var privateKey = openpgp.key.readArmored(key).keys[0];
        privateKey.decrypt(this.config.passphrase);
        var pgpMessage = cryptedMessage;
        pgpMessage = openpgp.message.readArmored(pgpMessage);
        this.openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) {
            successCallback(plaintext);
        }).catch(function(error) {
            errorCallback(error);
        });
    };


    this.config = function(config)
    {
        this.config.publicKey = config.publicKey;
        this.config.privateKey = config.privateKey;
        this.config.passphrase = config.passphrase;
    }; //config - какой-то json/js объект с необходимыми настройками
}
var OTSCrypter = function(){
    this.get_url = function(s){
        url = "";
        $.ajax({
            url: "https://onetimesecret.com/api/v1/share",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa("alphakun88@gmail.com" + ":" + "073bc6f06219ca0d82bc63ee4218a6ff7747bb9c"));
            },
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function(){
                alert("Cannot get data");
            },
            data: '{"secret": "' + s + '"}'
        });
    }
}
