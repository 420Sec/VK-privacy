var OTS = function()
{
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
