/**
 * Created by zekchan on 11/1/14.
 */
var PGPCrypter = function()
{
    this.encrypt = function(message, successCallback, errorCallback)
    {
        var openpgp = new openpgp();
        var key = this.PublicKey;
        var publicKey = openpgp.key.readArmored(key);
        openpgp.encryptMessage(publicKey.keys, message).then(function(pgpMessage)
        {
            successCallback(pgpMessage);
        }).catch(function(error)
        {
            errorCallback(error);
        });
    };

    this.decrypt = function(cryptedMessage, successCallback, errorCallback)
    {
        var openpgp = new openpgp();
        var key = this.config.privateKey;
        var privateKey = openpgp.key.readArmored(key).keys[0];
        privateKey.decrypt(this.config.passphrase);
        var pgpMessage = cryptedMessage;
        pgpMessage = openpgp.message.readArmored(pgpMessage);
        openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) {
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