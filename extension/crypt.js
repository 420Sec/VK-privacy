/**
 * Created by zekchan on 11/1/14.
 */
var PGPCrypter = function()
{
    this.openpgp = new openpgp();

    this.encrypt = function(message, successCallback, errorCallback)
    {
        var key = this.config.publicKey;
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

    this.isPGPMessage = function(message)
    {
        return true;
    };

    this.SetConfig = function(config)
    {
        this.config = config;

        //config.publicKey
        //config.privateKey
        //config.passphrase
    }; //config - какой-то json/js объект с необходимыми настройками

    this.isOpenKey = function(message)
    {
        return false;
    }

    this.PackMyKey = function(openkey)
    {
        var key = openkey;
        var publicKey = openpgp.key.readArmored(key);
        this.openpgp.encryptMessage(publicKey.keys, this.config.publicKey).then(function(pgpMessage)
        {
            return pgpMessage;
        }).catch(function(error)
        {
            return "WRONG PUBLIC KEY";
        });
    };

    this.IsAssignedToMe = function(message)
    {
        return true;
    };

    this.IsGrooupMessage = function(message)
    {
        return true;
    }

    this.ParseGroupMessage = function(message)
    {
        return "group parsed";
    }

    this.ParseMyMessage = function(message)
    {
          return "parsed";
    };

    this.ParsePGPMessage = function(message)
    {
        if (this.pgpCrypter.isOpenKey((message))) // request for new session
        {
            return this.PackMyKey(message);
        }
        else if (this.IsAssignedToMe(message))// all other stuff
        {
            return this.ParseMyMessage(message);
        }
        else if (this.IsGrooupMessage(message))
        {
            return this.ParseGroupMessage(message);
        }
    };

    this.EncryptPGP = function(message)
    {
        if ( this.Session == false )
        {
            return "cryptedmessage";
        }
    }

    
    this.status = function()
    {
        var status = "";

        $.ajax({
            url: "https://onetimesecret.com/api/v1/status",
            type: "GET",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa("alphakun88@gmail.com" + ":" + "073bc6f06219ca0d82bc63ee4218a6ff7747bb9c"));
            },
            success: function (data) {
                status = JSON.stringify(data);
            },
            error: function(data){
                status = JSON.stringify(data);
            }

        });

        return status;
    };


    this.share = function(message)
    {
        var sUrl = "https://onetimesecret.com/api/v1/share?secret=" + message;

        var key = "";

        $.ajax({
            url: sUrl,
            type: "POST",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa("alphakun88@gmail.com" + ":" + "073bc6f06219ca0d82bc63ee4218a6ff7747bb9c"));
            },
            success: function (data) {
                var result = jQuery.parseJSON(JSON.stringify(data));
                key = result.secret_key;
            },
            error: function(data){
                key = "fuck you";
            }

        });

        return key;
    };

    this.retrieve = function(message)
    {
        var rUrl = "https://onetimesecret.com/api/v1/secret/" + message;

        var value = "";

        $.ajax({
            url: rUrl,
            type: "POST",
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa("alphakun88@gmail.com" + ":" + "073bc6f06219ca0d82bc63ee4218a6ff7747bb9c"));
            },
            success: function (data) {
                    var result = jQuery.parseJSON(JSON.stringify(data));
                    value = result.value;
            },
            error: function(data){
                    value = "It either never existed or has already been viewed.";
            }

        });
 
        return value;
    };

}