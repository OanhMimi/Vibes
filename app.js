const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const debug = require('debug');
const csurf = require('csurf');
const passport = require('passport');
const session = require('express-session');
var bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');
const readsRouter = require('./routes/api/reads');
const thoughtsRouter = require('./routes/api/thoughts');
const habitsRouter = require('./routes/api/habits');

require('./config/passport'); 


const app = express();
const port = process.env.PORT ||"3000";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const {isProduction} = require('./config/keys')
if (!isProduction) {
    app.use(cors());
}

//API endpoints with middleware that will route to the appropriate js logic
app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
});



app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/reads',readsRouter);
app.use('/api/thoughts', thoughtsRouter);
app.use('/api/habits', habitsRouter);


// Express custom middleware for catching all requests that haven't gotten
// matched and formatting a 404 error to be sent as the response
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
  });
  
const serverErrorLogger = debug('backend:error');
// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});

var jsonParser = bodyParser.json()
app.all('*', jsonParser, function(req, res, next){

    console.log(
        "************ NEW REQUEST ************", '\n',
        'req.path:', req.path, '\n',
        'req.headers:', req.headers, '\n',
        'req.body:', req.body
    ); // For debugging

    next();
});

app.listen(port, () => {
  console.log(`Node.js server is listening on port ${port}`);
});

module.exports = app;
