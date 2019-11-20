const express = require('express'),
      app = express(),
      request = require('request'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      Campground = require('./models/campground'),
      Comment = require('./models/comment'),
      User = require('./models/user'),
      seedDB = require('./seeds');

// SETUP
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

seedDB();

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
// ========================
// ROUTES
// ========================
app.get('/', (req, res) => {
    res.render('landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
    // get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    })
});

// NEW - show for to creaste new
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

// CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            // render show template with that campground
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

// ===========================
// COMMENTS
// ===========================
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
    // Find campground by ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
    // get campground info
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds/');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

//==========================
// AUTH ROUTES
//==========================
// REGISTER
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campgrounds');
        })
    })
});

// LOGIN
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),
    (req, res) => {
    // unneeded callback kept for showing standard formats
});

// LOGOUT
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

// FUNCTIONS
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

// =========================
//  CATCHALL 
// =========================
app.get('*', (req, res) => {
    res.send("Are you lost?")
});

//===========================
// LISTENER
// ==========================
app.listen(3000, () => {
    console.log('Server started');
});