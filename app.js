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
      flash = require('connect-flash'),
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

const url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR: ' + err.message);
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());

// seedDB(); // seeding the DB

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: process.env.SECRET,
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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// ROUTES
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// DEPLOYED LISTENER
app.listen(process.env.PORT, process.env.IP);

// LOCAL LISTENER
// app.listen(3000, () => {
//     console.log('Server started');
// });