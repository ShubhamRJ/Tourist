var express    = require("express");
var Campground = require("../models/campgrounds");
var middleware = require("../middleware/index.js");
var router     = express.Router();

//campgrounds page route
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

//create new campground
router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var price= req.body.price;
	var image= req.body.image;
	var description = req.body.description;
	var author={
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name:name, price:price, image:image, description:description, author:author};
	Campground.create(newCampground,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/");
		}
	});
});

//new campground form route
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
});

//show a campground route
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			req.flash("error","Campground not found!");
			res.redirect("/campgrounds");
		}
		else{
			res.render("campgrounds/show.ejs",{campground: foundCampground});
		}
	});
});

//Edit route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground});
	});
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findOneAndDelete(req.params.id,function(err){
		res.redirect("/campgrounds");
	});
});

module.exports = router;