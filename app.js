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
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect('mongodb+srv://${process.env.USER}:${process.env.PW}@cluster0-gh7fl.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR: ' + err.message);
})

// mongodb+srv://jared:<password>@cluster0-gh7fl.mongodb.net/test?retryWrites=true&w=majority


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://jared:<password>@cluster0-gh7fl.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());

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