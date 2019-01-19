var express    = require("express");
var passport   = require("passport");
var User	   = require("../models/user");
var router     = express.Router();

//root route
router.get("/",function(req,res){
	res.render("landing");
});

//register user page
router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			return res.render("register",{"error":err.message});
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//login route
router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login", 
	passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),function(req,res){

});

//logout
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged out successfully!");
	res.redirect("/campgrounds");
});

module.exports = router;;