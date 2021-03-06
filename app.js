var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    Comment          = require("./models/comments"),
    User             = require("./models/user"),
    methodOverride   = require("method-override"),
    Campground       = require("./models/campground"),
    seedDB           = require("./seeds"),
    indexRoutes      = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    flash            = require("connect-flash")
    
var url=process.env.DATABASEURL || "mongodb://localhost/yelp_camp_final"
mongoose.connect(url,{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public/"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false, 
    saveUninitialized: false
}))
    
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    app.locals.moment = require('moment');
    next()
})

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes)

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});