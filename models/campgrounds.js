var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	country: String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		username: String
	},
	description: String,
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});
var Campground = mongoose.model("Campground",campgroundSchema);
module.exports = mongoose.model("Campground", campgroundSchema);