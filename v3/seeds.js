var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var data=[
	{
		name:"Canada",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdkAfiU8nm64OwRW2iL5ShMRiLXVKDSwXFRl9tt58SUW5mO-Uzw",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Canada",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdkAfiU8nm64OwRW2iL5ShMRiLXVKDSwXFRl9tt58SUW5mO-Uzw",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Canada",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdkAfiU8nm64OwRW2iL5ShMRiLXVKDSwXFRl9tt58SUW5mO-Uzw",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}	
];

function seedDB(){
	//Removing campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("Campground removed");
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				else{
					console.log("Campground added!");
					Comment.create(
						{
							text:"Blah Blah Blah Blah",
							author:"Shubham"
						},function(err,comment){
							if(err){
								console.log(err);
							}
							else{
								campground.comments.push(comment);
								campground.save();
							}
						}
					);
				}
			});
		});
	});
}

module.exports = seedDB;