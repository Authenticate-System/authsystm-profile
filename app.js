const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();

// New stuff to add
//---------------------------------------------------
const hbs = require('hbs');
const mongoose = require('mongoose');
const passport = require('passport');
//const Strategy = require('passport-local').Strategy;
const authUtils = require('./utils/auth');
const session = require('express-session');
const flash = require('connect-flash');
const users = require("./models/userModel");
const connection = require("./db");
// --------------------------------------------------

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Add new routes
// --------------------------------------------------
const authRouter = require('./routes/auth');
// --------------------------------------------------

const port = 3000
const app = express();
app.use(express.json());

// Connect to db
// --------------------------------------------------
connection();

//const url = `mongodb+srv://raghad:N7oPBFuxakmVLIEl@auth.nj2qv.mongodb.net/auth?retryWrites=true&w=majority`;

// mongoose.connect(url, {
//   //useCreatendex: true, 
//   //useFindAndModify: false, 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// }, err => {
//   if(err) throw err;
//   console.log('Connected to MongoDB!!!')
// })

// Configure passport
// // --------------------------------------------------
// passport.use(new Strategy((email,password, done) => {
//   console.log("HELLO");
//   users.findOne({ email }, (err, users) => {
//     if (err) {
//       return done(err);
//     }

//     if (!users) {
//       return done(null, false);
//     }
//     if (users.password != authUtils.hashPassword(password)) {
//       return done(null, false);
//     }

//     return done(null, users);
//   });
// }));


passport.serializeUser((users, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});
// --------------------------------------------------


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// Set partials for handlebars
// --------------------------------------------------
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// --------------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Configure session, passport, flash
// --------------------------------------------------
app.use(session({
  secret: 'session secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});
// --------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Add new routes
// --------------------------------------------------
app.use('/auth', authRouter);
// --------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})

module.exports = app;