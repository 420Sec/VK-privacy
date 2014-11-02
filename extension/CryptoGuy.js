/**
 * Created by zekchan on 11/1/14.
 */
var CryptoGuy = function()
{
    this.pgpCrypter = new PGPCrypter();

    this.Parse = function ( message )
    {
        if (this.isCryptoMessage(message))
        {
            if (this.pgpCrypter.isPGPMessage(message))
            {
                this.pgpCrypter.ParsePGPMessage(message);
            }
        }
    };

    this.isCryptoMessage = function (message)
    {
        return true;
    };


}