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
        return true;
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
    }

    this.ParsePGPMessage = function(message)
    {
        return "parsed";
    }
}
