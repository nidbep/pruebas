// Conexión
function isConnected(){
	//se utiliza una funcion de phonegap para saber si hay conexion a internet en 
	//el dispositivo
	if(navigator.connection.type!=Connection.NONE)
		return true;
	else
		return false;
}