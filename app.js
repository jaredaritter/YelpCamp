const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'},
    {name: 'Granite Hill', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'},
    {name: 'Mountain Goats Rest', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'}
];

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.post('/campgrounds', (req, res) => {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get('*', (req, res) => {
    res.send("Are you lost?")
});

app.listen(3000, () => {
    console.log('Server started');
});