var express    = require("express");
var Campground = require("../models/campgrounds");
var User 	   = require("../models/user")
var middleware = require("../middleware/index.js");
var router     = express.Router();

//campgrounds page route
router.get("/campgrounds",function(req,res){
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
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image= req.body.image;
	var description = req.body.description;
	var country = req.body.country;
	var author={
		id: req.user._id,
		username: req.user.name
	};
	var newCampground = {name:name, image:image, description:description,country:country, author:author};
	Campground.create(newCampground,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			User.findById(req.user._id,function(err,user){
				if(err){
					console.log(err);
				}
				else{
					user.content.push(campground._id);
					user.save();
				}
			})
			res.redirect("/");
		}
	});
});

//new campground form route
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
});

//show a campground route
router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			let name=foundCampground.name;
			name=name.toLowerCase();
			name=name.replace(/\s/g,'');
			res.render("campgrounds/show.ejs",{name:name,campground: foundCampground});
		}
	});
});

//list campgrounds by search
router.post("/campgrounds/list",function(req,res){
	let search = req.body.search;
	search=search.charAt(0).toUpperCase()+search.slice(1);
	Campground.find({"name" :{$regex: '^'+ search}},function(err,foundCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index.ejs",{campgrounds:foundCampgrounds});
		}
	})
});

//Edit route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground});
	});
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndDelete(req.params.id,function(err){
		res.redirect("/campgrounds");
	});
});

router.get("*",function(req,res){
	res.redirect("back");
});
module.exports = router;