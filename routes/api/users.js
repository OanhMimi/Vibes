require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const {loginUser} = require('../../config/passport');
const {restoreUser} = require('../../config/passport')
const {isProduction} = require('../../config/keys')

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', async(req, res, next) => {
    return res.json({
      message: "GET /api/users"
    })
  });

//User SIGN UP
router.post('/signup', validateRegisterInput, async(req,res,next)=>{
     // Check to make sure nobody has already registered with a duplicate email
    const user = await User.findOne({
      $or: [{email: req.body.email}]
    });
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
    return res.json(await loginUser(user));
  })(req, res, next);
}) 

  //route to return current user 
router.get('/current', restoreUser, (req,res) => {
  if (!isProduction){ 
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    firstName: req.user.firstName,
    email: req.user.email
  });
});

module.exports = router;
