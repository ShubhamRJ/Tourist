var express = require("express");
var bodyParser = require("body-parser");

var	app = express();

var campgrounds = [
		{name:"Salmon Creek",image:"https://farm9.staticflickr.com/8230/8365349500_00502af0bf.jpg"},
		{name:"Granite Hill",image:"https://pixabay.com/get/ea3db80f2ef0093ed1584d05fb1d4e97e07ee3d21cac104491f5c970aee5b1b8_340.jpg"},
		{name:"Mountain Goat's Rest",image:"https://farm4.staticflickr.com/3254/2347367122_bbc23e7923.jpg"},
		{name:"Salmon Creek",image:"https://farm9.staticflickr.com/8230/8365349500_00502af0bf.jpg"},
		{name:"Granite Hill",image:"https://pixabay.com/get/ea3db80f2ef0093ed1584d05fb1d4e97e07ee3d21cac104491f5c970aee5b1b8_340.jpg"},
		{name:"Mountain Goat's Rest",image:"https://farm4.staticflickr.com/3254/2347367122_bbc23e7923.jpg"},
		{name:"Salmon Creek",image:"https://farm9.staticflickr.com/8230/8365349500_00502af0bf.jpg"},
		{name:"Granite Hill",image:"https://pixabay.com/get/ea3db80f2ef0093ed1584d05fb1d4e97e07ee3d21cac104491f5c970aee5b1b8_340.jpg"},
		{name:"Mountain Goat's Rest",image:"https://farm4.staticflickr.com/3254/2347367122_bbc23e7923.jpg"}
	];

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image= req.body.image;
	var newCampground = {name:name, image:image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.listen(3000,function(){
	console.log("Server started...");
});