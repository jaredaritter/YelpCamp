const express = require('express'),
      app = express(),
      request = require('request'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      Campground = require('./models/campground'),
      Comment = require('./models/comment'),
      User = require('./models/user'),
      seedDB = require('./seeds');

// REQUIRING ROUTES
const commentRoutes = require('./routes/comments'),
      campgroundRoutes = require('./routes/campgrounds'),
      indexRoutes = require('./routes/index');

// SETUP
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// seedDB(); // seeding the DB

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'There is a huge secret that I am not going to tell you',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// ROUTES
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// LISTENER
app.listen(3000, () => {
    console.log('Server started');
});