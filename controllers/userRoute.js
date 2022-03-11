const passport = require("passport");
const passConfig = require("../utils/passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function (app) {
  app.get('/',function(req,res,next){
    if(req.user){
      res.redirect('/home')
    }else
    res.render('index')
  })
  app.get('/components',function(req,res,next){

    res.render('components')
  })


  app.get("/login", function (req, res, next) {
    if (req.user) return res.redirect("/home");
    else {
      // res.render("accounts/login", { name: undefined });
    //   var LoginMessage=req.flash("loginMessage")
    //   if(LoginMessage.length==0){
    //     res.json("Login not successful")
    //   }else
    //   res.json(LoginMessage);
    // }
    res.render('login')
    }
  });
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/home",
      failureRedirect: "/login",
    })
  );

  app.post("/create-user", async (req, res) => {
    var userFound = await User.findOne({ email: req.body.email });
    if (userFound) {
      console.log("exists");
      return res.redirect("/");
    }
    var user = new User();

    //  const salt=await bcrypt.genSalt(10);
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
       await user.save(function (err) {
         //res.json(user);
       });
    res.redirect('/login')
    //await  res.render('accounts/login',{ name: undefined });
  });

  app.get("/home", async (req, res, next) => {
    if (req.user) {
        if(req.user.email==="admin@gmail.com"){
                res.redirect('/admin/home')
        }else{
          res.render('home')
        }
    } else {
      res.redirect("/");
    }
  });

  app.get("/admin/home", async (req, res, next) => {
    if (req.user) {
        var userFound = await User.findOne({email:req.user.email})

        if(req.user.email==="admin@gmail.com"){
                res.render('adminHome')
        }
          else{
              res.redirect('/')
          }
        
    } else {
      res.redirect("/");
    }
  });

  app.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
  });
};
