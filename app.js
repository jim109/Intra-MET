var express = require("express"); 
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session"); 
var router_app = require("./router_app");
var session_middleware = require("./middlewares/session");

var app = express();


app.use("/public",express.static('public'));
app.use(bodyParser.json());//peticiones para formatos application/json
app.use(bodyParser.urlencoded({extended:true}));


/* /app */ //todas las rutas que necesito que el usuario esta logeado las escribo aca

/*  / */  // las que no requieran que las rutas inicien sesion el usuario se monta desde diagonal

app.use(cookieSession({
	name: "session",
	keys: ["llave-1","llave-2"]
}));


app.set("view engine", "jade");


app.get("/", function(req,res){
	console.log(req.session.user_id);
	res.render("index");	
});

app.get("/signup", function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("signup");
	});//find va a la base de datos y busca
});

app.get("/login", function(req,res){
	res.render("login");
});

/*pagina formato orden de corte*/
app.get("/app/corte",function(req,res){
	res.render("app/corte/fcorte");
});



app.post("/users",function(req,res){
	var user = new User({
						email:req.body.email,
						password: req.body.password,
						password_confirmation: req.body.password_confirmation,
						username:req.body.username
					});
	user.save().then(function(us){
		res.send("Guardamos el usuario exitosamente");
	},function(err){
		console.log(String(err));
		res.send("Hubo un error al guardar el usuario");
	});
});


app.post("/sessions",function(req,res){
	User.findOne({email:req.body.email,password:req.body.password}, function(err,user)
	{
		req.session.user_id= user._id;
		res.redirect("/app");
	});

		
});
app.use("/app",session_middleware);
app.use("/app", router_app);


app.listen(8080);