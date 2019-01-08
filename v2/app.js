var express    = require("express");
	bodyParser = require("body-parser");
	mongoose   = require("mongoose")
	app        = express();

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
// 	{
// 		name:"Canada",
// 		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdkAfiU8nm64OwRW2iL5ShMRiLXVKDSwXFRl9tt58SUW5mO-Uzw",
// 		description:"One of the most beautiful place in the world!"
// 	},
// 	function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log(campground);
// 		}
// 	});

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("index.ejs",{campgrounds:allcampgrounds});
		}
	});
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image= req.body.image;
	var description = req.body.description;
	var newCampground = {name:name, image:image, description:description };
	Campground.create(newCampground,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			console.log("Campground added!")
			console.log(campground);
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new",function(req,res){     res.render("new.ejs"); });

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("show.ejs",{campground: foundCampground});
		}
	});
});
app.listen(3000,function(){
	console.log("Server started...");
});