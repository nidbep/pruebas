//captura
function tomarFoto(){
	navigator.device.capture.captureImage(function(c){
		var cant = c.length;
		for(i=0;i<cant;i++)
			foto = c[i].fullPath;
		$('#regFoto').attr('rel',foto);
		$('#mFoto').html('<img src="'+foto+'" width="100%" />');
	},function(err){
		navigator.notification.alert("Error: "+err.code, null, "Captura","Aceptar");
	}, { limit:2 });
}