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


    this.SetConfig = function(config)
    {
        this.config = config;

        //config.publicKey
        //config.privateKey
        //config.passphrase
    }; //config - какой-то json/js объект с необходимыми настройками
}
