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

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf')

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

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);


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

app.get('/', (req, res) => {
  res.send('Hello from Node.js server!');
});

app.listen(port, () => {
  console.log(`Node.js server is listening on port ${port}`);
});

module.exports = app;
