const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
require('./../models/User')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');



const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) {
      // return the user to the frontend
      return done(null, user);
    }
    // return false since there is no user
    return done(null, false);
  }
  catch (err) {
    done(err);
  }
}));

//create a protected route by returning an error response if there is no authenticated user
exports.requireUser = passport.authenticate('jwt',{session: false});

exports.restoreUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false}, function(err, user) {
      if (user) req.user = user;
      next();
  })(req, res, next);
}

passport.use(new LocalStrategy({
    session: false,
    usernameField: 'email',
    passwordField: 'password',
}, async function(email, password, done)
{
    const user = await User.findOne({email});
    if (user) {
        bcrypt.compare(password, user.hashedPassword, (err,isMatch) => {
            if (err || !isMatch) done(null,false);
            else done(null,user);
        });
    } else
    done(null,false);
})); 

passport.serializeUser(function(user, cb) {
  console.log("serializing user uwu:" + JSON.stringify(user))
  process.nextTick(function() {
      console.log("WOOOOOOOOO LOGIN! SAMUEL SAMPSON SMITHERSON SNYDERS");
      //return cb(null, { id: user.id, username: user.username });
      return cb(null, user.id);
  })
});

passport.deserializeUser(function (id, cb) {
  console.log("deserializing user owo:" + JSON.stringify(id))
  User.findOne({id}, function (err, user) {
      if (err) { return cb(err)}
      return cb(null, user);
  })
});

exports.loginUser = async function (user) {
    const userInfo = {
        _id: user._id,
        firstName: user.firstName,
        email: user.email
    };
    const token = await jwt.sign(
        userInfo, //payload
        secretOrKey, //our secret signature 
        {expiresIn: 3600} //token expires after 1 hr 
    );
    return {
        status: "success",
        user: userInfo,
        token
    };
};



