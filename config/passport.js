
const jwt = require('jsonwebtoken');
const {secretOrKey} = require('./keys');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options,async(jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload._id)
        if (user){
            return done(null,user); //return the user to the front end
        }
        return done(null,false); //return false since there is no user
    }
    catch(err){
        done(err);
    }
}));

//create a protected route by returning an error response if there is no authenticated user
exports.requireUser = passport.authenticate('jwt',{session: false});

exports.restoreUser = (req,res,next) => {
    return passport.authenticate('jwt', {session:false}, function(err,user){
        if (user) req.user = user; //set the user on req.user, if there is an authenticated user
        next();
    })(req,res,next); 
};

passport.use(new localStrategy({
    session: false,
    usernameField: 'email',
    passwordField: 'password',
}, async function(email, password, done){
    const user = await User.findOne({email});
    if (user) {
        bcrypt.compare(password, user.hashedPassword, (err,isMatch) => {
            if (err || !isMatch) done(null,false);
            else done(null,user);
        });
    }else
    done(null,false);
})); 

exports.loginUser = async function(user) {
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
        user: userInfo,
        token
    };
};