/**
 * Created by zekchan on 11/1/14.
 */
var CryptoGuy = function()
{
    this.pgpCrypter = new PGPCrypter();

    this.OpenTag = "[420Sec]";
    this.CloseTag = "[/420Sec]";

    this.Decrypt = function ( message)
    {
        if (this.isCryptoMessage(message))
        {
            if (this.pgpCrypter.isPGPMessage(message))
            {
                this.pgpCrypter.ParsePGPMessage(message);
            }
        }
    };

    /**
     * @return {string}
     */
    this.Encrypt = function(message)
    {
        var pgpMessage = this.OpenTag +
            this.pgpCrypter.EncryptPGP(message) + this.CloseTag;
        return pgpMessage;
    };

    this.isCryptoMessage = function (message)
    {
        return true;
    };

};