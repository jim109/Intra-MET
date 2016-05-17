var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/clientes");//creamos la conexion con mongodb y le damos la ruta que vamos a manejar si vamos a hacerlo en nuestro equipo seria desde localhost y el nombre del archivo que queremos colocar


var email_match= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"]

var ClienteSchema = new Schema({
	nit: {type:Number, min:[5,"El nit no puede ser menor a 5 digitos."], max:[10,"El nit no puede ser mayor que 10"]},
	razon_social: String,
	direccion: String,
	email:{type: String,require:"El correo es obligatorio",match:email_match} //require es que el campo es obligatorio de digitar

});

var Cliente = mongoose.model("Cliente",ClienteSchema);

module.exports = Cliente;