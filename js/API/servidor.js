//Servidor
function enviarDatos(nom, tel, email, foto){
	$.ajax({
		type: "POST",
		url: "http://www.igitsoft.com/pgtest.php",
		data: "nom="+nom+"&tel="+tel+"&mai="+email
	}).done(function(msg) {
		if(msg==1){
			subirFoto(foto,nom);
		}else{
			navigator.notification.alert("Error al Registrarse", null, "Registro", "Aceptar");	
		}
	});
}

function subirReserva(id,th, ha, di, pe){
	$.ajax({
		type: "POST",
		url: "http://www.igitsoft.com/pgtest.php",
		data: "nom="+th+"&tel="+ha+"&mai="+di+"&pe="+pe
	}).done(function(msg) {
		if(msg==1){
			navigator.notification.alert("Reserva Sincronizada Satisfactoria",function(){
				guardarHistorial(th,ha,di,pe);
				borrarReserva(id);
			},"Reserva Realizada","Aceptar");
		}else{
			navigator.notification.alert("Error al Registrarse", null, "Registro", "Aceptar");	
		}
	});
}

