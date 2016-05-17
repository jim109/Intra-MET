var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var email_match= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"]

var ClienteSchema = new Schema({
	nit: {type:Number, min:[5,"El nit no puede ser menor a 5 digitos."], max:[10,"El nit no puede ser mayor que 10"]},
	razon_social: String,
	direccion: String,
	email:{type: String,require:"El correo es obligatorio",match:email_match} //require es que el campo es obligatorio de digitar

});

mongoose.model('Cliente', ClienteSchema)