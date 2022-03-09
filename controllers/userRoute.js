const passport = require("passport");
const passConfig = require("../utils/passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function (app) {
  app.get("/login", function (req, res, next) {
    if (req.user) return res.redirect("/home");
    else {
      // res.render("accounts/login", { name: undefined });
      res.json("Login needed!");
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
      return res.redirect("/login");
    }
    var user = new User();

    //  const salt=await bcrypt.genSalt(10);
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    //    await user.save(function (err) {
    //      //res.json(user);
    //    });
    res.json("Go for sign in");
    //await  res.render('accounts/login',{ name: undefined });
  });

  app.get("/home", async (req, res, next) => {
    if (req.user) {

        var userFound = await User.findOne({email:req.user.email})

        if(userFound.userType==="admin"){
                
        }else{

        }

      res.json({
        Status: true,
        Message: "Welcome",
      });
    } else {
      res.json("Login required");
    }
  });
};
