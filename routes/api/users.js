require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const {loginUser} = require('../../config/passport');
const {restoreUser} = require('../../config/passport');
const {isProduction} = require('../../config/keys')

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const jsonStringify = require('json-stringify-safe');


/* GET users listing. */
router.get('/', async(req, res, next) => {
  const users = await User.find()
    res.json(users)
  });

//User SIGN UP
router.post('/signup', validateRegisterInput, async(req,res,next)=>{
     // Check to make sure nobody has already registered with a duplicate email
    const user = await User.findOne(
      {email: req.body.email}
    );
    if (user){
      //Throw a 400 error if the email address and/or email already exists
      const err = new Error("Validation error");
      err.statusCode = 400;
      const errors = {};
      if (user.email === req.body.email){
        errors.email = "A user has already registered with this email";
      }
      err.errors = errors;
      return next(err);
    } 
    //once verification completes using async and it doesn't return err, then create new user
    const newUser = new User({
      firstName: req.body.firstName,
      email: req.body.email
    });

    //we don't want to store pw as plain text, salt and hash the pw to be encrypted 
    bcrypt.genSalt(10,(err,salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err,hashedPassword) => {
        if (err) throw err;
        try{
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          return res.json(await loginUser(user));
        }
        catch(err){
          next(err);
        }
      })
    })
  });

  var quickTest;

  //User LOGIN
router.post('/login', validateLoginInput, async(req,res,next)=>{
  passport.authenticate('local', async function(err,user){
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = {email: "Invalid credentials"};
      return next(err);
    }
    // if (user) req.user = user;
    return res.json(await loginUser(user));
  })(req, res, next);
}) 

  //route to return current user 
router.get('/current', restoreUser, async(req,res) => {
  if (req.isAuthenticated()) {
     const user1 = req.user;
    // console.log("userID " + req.user.usernameField);
    // //console.log("email " + req.user.passwordField);
      console.log(user1, "user1");
      console.log("Testing details");
      console.log(req.session, "passport");
      console.log("email 2: " + req.user.email)
  }
  // console.log("how are you?")
  if (!isProduction){ 
    console.log("i'm doing well")
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }

  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    firstName: req.user.firstName,
    email: req.user.email
  });
  console.log(req.user.firstName)
});



module.exports = router;
