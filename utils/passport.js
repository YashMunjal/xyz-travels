const passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var User=require('../models/User')
var bcrypt=require('bcryptjs')

/* Password Compare */





passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,function(err,user){
        done(err,user);
    })
})

passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err) return done(err);

        if(!user){
            return done(null,false)
        }
        if(user.password!=password){
            return done(null,false)
        }
        req.flash('loginMessage','Successfully login')
        return done(null,user);

    })

}))
