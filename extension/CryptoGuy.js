/**
 * Created by zekchan on 11/1/14.
 */
CryptoGuy =
{
    Decrypt: function ( message )
    {
        if (this.isCryptoMessage(message))
        {
            if (this.pgpCrypter.isPGPMessage(message))
            {
                this.pgpCrypter.ParsePGPMessage(message);
            }
        }
    },

    Encrypt: function (message)
    {
        var pgpMessage = this.OpenTag +
            this.pgpCrypter.EncryptPGP(message) + this.CloseTag;
        return pgpMessage;
    },

    isCryptoMessage: function (message)
    {
        return true;
    },

    OpenTag: "[420Sec]",
    CloseTag: "[/420Sec]"
};