var express    = require("express");
var Campground = require("../models/campgrounds");
var Comment    = require("../models/comment");
var middleware = require("../middleware/index.js");
var router     = express.Router({mergeParams : true});

//new comment page
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:campground});
		}
	});
});

//create new comment
router.post("/campgrounds/:id/comments/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.name;
					temp = new Date();
					var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					year = temp.getFullYear();
					month = temp.getMonth()+1;
					dt = temp.getDate();
					if (dt < 10) {
					  dt = '0' + dt;
					}
					let date =months[month]+' '+dt+', '+year;
					comment.date =date;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added comment!");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});


router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedComment){
		if(err){
			res.redirect("back");
		}
		else{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


module.exports = router;