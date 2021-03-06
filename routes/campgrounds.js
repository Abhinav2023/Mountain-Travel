// var express=require("express");
// var router=express.Router();
// var Campground=require("../models/campground");
// var middlewareObj=require("../middleware")
// var multer = require('multer');

// var storage = multer.diskStorage({
//   filename: function(req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   }
// });
// var imageFilter = function (req, file, cb) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
// var upload = multer({ storage: storage, fileFilter: imageFilter})

// var cloudinary = require('cloudinary');
// cloudinary.config({ 
//   cloud_name: 'djcgm2m7l', 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
// router.post("/", middlewareObj.isLoggedIn, upload.single('image'), function(req, res) {
//     cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
//       if(err) {
//         req.flash('error', err.message);
//         return res.redirect('back');
//       }
//       // add cloudinary url for the image to the campground object under image property
//       req.body.campground.image = result.secure_url;
//       // add image's public_id to campground object
//       req.body.campground.imageId = result.public_id;
//       // add author to campground
//       req.body.campground.author = {
//         id: req.user._id,
//         username: req.user.username
//       }
//       Campground.create(req.body.campground, function(err, campground) {
//         if (err) {
//           req.flash('error', err.message);
//           return res.redirect('back');
//         }
//         res.redirect('/campgrounds/' + campground.id);
//       });
//     });
// });

// //INDEX - show all campgrounds
// router.get("/", function(req, res){
//     // Get all campgrounds from DB
//     Campground.find({}, function(err, allCampgrounds){
//       if(err){
//           console.log(err);
//       } else {
//           res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
//       }
//     });
// });

// router.post("/",middlewareObj.isLoggedIn, function(req, res){
//     // get data from form and add to campgrounds array
//     var name = req.body.name;
//     var price = req.body.price;
//     var image = req.body.image;
//     var desc= req.body.description;
//     var author={
//         id: req.user._id,
//         username: req.user.username
//     }
//     var newCampground = {name: name,price: price, image: image, description: desc,author: author}
    
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         }
//         else{
//             req.flash("success","Campground Successfully Added")
//             res.redirect("/campgrounds");
//         }
//     })
// });

// router.get("/new",middlewareObj.isLoggedIn, function(req, res){
//   res.render("campgrounds/new"); 
// });

// router.get("/:id",function(req,res){
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err || !foundCampground){
//             req.flash("error","Campground not found")
//             res.redirect("back")
//         }
//         else{
//             res.render("campgrounds/show",{campground: foundCampground});
//         }
//     })
// })

// router.get("/:id/edit",middlewareObj.campgroundLoggedIn,function(req,res){
//     Campground.findById(req.params.id,function(err,foundCampground){
//         res.render("campgrounds/edit",{campground:foundCampground});
//     })
// })

// router.put("/:id",middlewareObj.campgroundLoggedIn,function(req,res){
//      Campground.findById(req.params.id, async function(err, campground){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         } else {
//             if (req.file) {
//               try {
//                   await cloudinary.v2.uploader.destroy(campground.imageId);
//                   var result = await cloudinary.v2.uploader.upload(req.file.path);
//                   campground.imageId = result.public_id;
//                   campground.image = result.secure_url;
//               } catch(err) {
//                   req.flash("error", err.message);
//                   return res.redirect("back");
//               }
//             }
//             campground.name = req.body.name;
//             campground.description = req.body.description;
//             campground.save();
//             req.flash("success","Successfully Updated!");
//             res.redirect("/campgrounds/" + campground._id);
//         }
//     });
// });

// router.delete("/:id/",middlewareObj.campgroundLoggedIn,function(req,res){
//      Campground.findById(req.params.id, async function(err, campground) {
//     if(err) {
//       req.flash("error", err.message);
//       return res.redirect("back");
//     }
//     try {
//         await cloudinary.v2.uploader.destroy(campground.imageId);
//         campground.remove();
//         req.flash('success', 'Campground deleted successfully!');
//         res.redirect('/campgrounds');
//     } catch(err) {
//         if(err) {
//             console.log("error")
//           req.flash("error", err.message);
//           return res.redirect("back");
//         }
//     }
//   });
// })
// module.exports=router;


var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middlewareObj=require("../middleware")


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

router.post("/",middlewareObj.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc= req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name,price: price, image: image, description: desc,author: author}
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success","Campground Successfully Added")
            res.redirect("/campgrounds");
        }
    })
});

router.get("/new",middlewareObj.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground not found")
            res.redirect("back")
        }
        else{
            res.render("campgrounds/show",{campground: foundCampground});
        }
    })
})

router.get("/:id/edit",middlewareObj.campgroundLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
    })
})

router.put("/:id",middlewareObj.campgroundLoggedIn,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
        if(err){
            console.log(err)
        }else{
            req.flash("success","Camground Successfully Updated")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

router.delete("/:id/",middlewareObj.campgroundLoggedIn,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            req.flash("success","Campground Successfully Deleted")
            res.redirect("/campgrounds")
        }
    })
})
module.exports=router;