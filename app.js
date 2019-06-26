//dependancies
var express       = require("express"),
	mongoose      = require("mongoose"),
	passport   	  = require("passport"),
	flash		  = require("connect-flash"),
	bodyParser    = require("body-parser"),
	LocalStrategy = require("passport-local"),
	Campground    = require("./models/campgrounds"),
	Comment       = require("./models/comment"),
	User 		  = require("./models/user"),
	methodOverride= require("method-override");

//routes
var authRoutes 		  = require("./routes/auth")
	commentRoutes     = require("./routes/comments");
	campgroundRoutes  = require("./routes/campgrounds");

var app = express();
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret:"Hello there",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success= req.flash("success");
	next();
});

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000,function(){
	console.log("Server started...");
});