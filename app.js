const express = require('express'),
      request = require('request'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      app = express(),
      Campground = require("./models/campground"),
      seedDB = require('./seeds');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

seedDB();

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
            res.render('index', {campgrounds: allCampgrounds});
        }
    })
});

// NEW - show for to creaste new
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
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
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    })
});

app.get('*', (req, res) => {
    res.send("Are you lost?")
});

app.listen(3000, () => {
    console.log('Server started');
});