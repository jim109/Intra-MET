var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");//creamos la conexion con mongodb y le damos la ruta que vamos a manejar si vamos a hacerlo en nuestro equipo seria desde localhost y el nombre del archivo que queremos colocar

var posibles_valores=["M","F"];

var email_match= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"]

var password_validation = {
	validator: function(p){
		return this.password_confirmation == p;
	},
	message:"Las constraseñas no son iguales"
}

//Como definir un Schema ( Defunimos el schema y pasamos un JSOn)
//las validaciones de mongoose se hacen a traves del modelo o schema
var user_schema = new Schema({
	name:String,
	username: {type:String,require:true,maxlength:[50,"Username muy grande"]},
	password: {type:String,minlength:[8, "el password es muy corto"], validate: password_validation},
	age:{type:Number, min:[5,"la edad no puede ser menor que 5"], max:[100,"la edad no puede ser mayor que 100"]},
	email:{type: String,require:"El correo es obligatorio",match:email_match}, //require es que el campo es oblogatorio de digitas
	date_of_birth:Date,
	sex: {type:String,enum:{values:posibles_valores,message:"Opcion no valida"}}

});



user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;

}).set(function(password){
	this.p_c = password;
});


//model es el contructor que produce los modelos
var User = mongoose.model("User",user_schema);

module.exports.User = User;


/*

TIPOS DE DATOS QUE PODEMOS GUARDAR EN MONGODB

String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array

*/

