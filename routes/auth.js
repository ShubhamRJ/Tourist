var express    = require("express");
var passport   = require("passport");
var User	   = require("../models/user");
var Campground = require("../models/campgrounds");
var router     = express.Router();

//root route
router.get("/",function(req,res){
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index.ejs",{campgrounds:allcampgrounds});
		}
	});
});

//register user page
router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register",function(req,res){
	var newUser = new User(
		{
			username: req.body.username,
			name    : req.body.name,
			age		: req.body.age
		});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			return res.render("register",{"error":err.message});
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});

//login route
router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash   : "User not found!"
	}),function(req,res){

});

//logout
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

module.exports = router;;