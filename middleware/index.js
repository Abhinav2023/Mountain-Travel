var Campground=require("../models/campground")
var Comment=require("../models/comments")

var middlewareObj={};

middlewareObj.campgroundLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground Not Found")
            res.redirect("back")
        }
        else{
            if(foundCampground.author.id.equals(req.user._id)){
                next()
            }
            else{
                req.flash("error","You Didn't Have That Permission To Do That")
                res.redirect("back")
            }
        }
    })}
    else{
        req.flash("error","You Need To Be Logged In")
        res.redirect("back")
    }
}

middlewareObj.commentLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.idd,function(err,foundComment){
        if(err || !foundComment){
            req.flash("error","Comment Not found")
            res.redirect("back")
        }
        else{
            if(foundComment.author.id.equals(req.user._id)){
                next()
            }
            else{
                req.flash("error","You Didn't Have That Permission To Do That")
                res.redirect("back")
            }
        }
    })}
    else{
        req.flash("error","You Need To Be Logged In")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error","You must be logged in first")
    res.redirect("/login")
}


module.exports=middlewareObj;