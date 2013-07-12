//almacenamiento
function registro(usuario){
	if(window.localStorage.getItem('id')==undefined){
		window.localStorage.setItem('usuario',usuario);
		window.localStorage.setItem('id',infoDisp()['id']);
	}
}
//Acceso a la base de datos
function accesoBD(){
	var bd = window.openDatabase('Hotel','1.0','Hotel', 2000000);
	return bd;
}
function guardarReserva(th, ha, di, pe){
	accesoBD().transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS reservas (id unique, th, ha, di, pe)');
		tx.executeSql('INSERT INTO reservas (th, ha, di, pe) VALUES ("'+th+'","'+ha+'","'+di+'","'+pe+'")');
	}, function(err){
		alert("Error processing SQL: "+err);
	}, function(){
		navigator.notification.alert("Esperando conexión con servidor...", null, "Guardado","Aceptar");
	});
}
function guardarHistorial(th, ha, di, pe){
	accesoBD().transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id unique, th, ha, di, pe)');
		tx.executeSql('INSERT INTO historial (th, ha, di, pe) VALUES ("'+th+'","'+ha+'","'+di+'","'+pe+'")');
	}, function(err){
		alert("Error processing SQL: "+err);
	}, function(){
		navigator.notification.alert("Hecho", null, "Guardado","Aceptar");
	});
}

function leerReservas(){
	accesoBD().transaction(function(tx){
		//el comando recibe 1 (solo la sentencia sql) o 4 parametros, sin son 4 son:
		//1.Sentencia SQL
		//2.Arreglo (donde se almacenaran los resultados)
		//3.funcion de resultado
		//4.Funcion de error
		tx.executeSQL('select * from reservas',[],function(tx2,resultado){
			var largo = resultado.rows.length;
			if (largo>0){				
				//accesar a las columnas x fila resultado del query
				for (i=0; i<largo;i++){
					var id = resultado.rows.item(i).id;
					var th = resultado.rows.item(i).th;
					var ha = resultados.rows.item(i).ha;
					var di = resultados.rows.item(i).di;
					var pe = resultados.roes.item(i).pe;
					subirReserva(id,th,ha,di,pe);
				}
			}
		},function(err){
			alert('Error: '+err.code)
		});		
	},function(err){
		navigator.notification.alert("Error",null,"Error","Aceptar");
	},function(){
		return 1;
	});
}

function borrarReserva(id){
	accesoBD().transaccion(function(tx){
		tx.executeSQL('delete from reservas where id="'+id+'"');
	},function (err){
		alert("Error: "+err.code);
	},function(){
		navigator.notification.alert("Guardado",null,"Guardado","Aceptar");
	});
}

function leerHistorial(){
	accesoBD().transaction(function(tx){
		/*el comando recibe 1 (solo la sentencia sql) o 4 parametros, si son 4 son:
			1.Sentencia SQL
			2.Arreglo (donde se almacenaran los resultados)
			3.funcion de resultado
			4.Funcion de error*/
		tx.executeSQL('select * from historial',[],function(tx2,resultado){
			var largo = resultado.rows.length;
			if (largo>0){
				var code = '';				
				//accesar a las columnas x fila resultado del query
				for (i=0; i<largo;i++){
					code += '<div data-role="collapsible-set">'+
							'<div data-role="collapsible" data-collapsed="true">'+
								'<h3>'+
									'08/06/2013'+
								'</h3>'+
								'<strong>Días</strong>'+resultado.rows.item(i).di+'<br />'+
								'<strong>Habitaciones</strong>'+resultado.rows.item(i).ha+'<br />'+
								'<strong>Personas</strong>'+resultado.rows.item(i).pe+
							'</div>'+
						'</div>';
				}
				$('#historial div[data-role=content]').html(code);
			}
		},function(err){
			alert('Error: '+err.code)
		});		
	},function(err){
		navigator.notification.alert("Error",null,"Error","Aceptar");
	},function(){
		return 1;
	});	
}