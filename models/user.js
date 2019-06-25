var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	name: String,
	age:Number,
	password: String,
	content:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Campground"
		}
	]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);