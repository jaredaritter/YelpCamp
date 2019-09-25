const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://www.tripsavvy.com/thmb/B99SUpBFjesrl8TFUJBSrGAY0SA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-508066351-5a12280d9e942700376da496.jpg'},
    {name: 'Granite Hill', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'},
    {name: 'Mountain Goats Rest', image: 'https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/07/main/litter-free-campground-sun-0816.jpg'},
    {name: 'Salmon Creek', image: 'https://www.tripsavvy.com/thmb/B99SUpBFjesrl8TFUJBSrGAY0SA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-508066351-5a12280d9e942700376da496.jpg'},
    {name: 'Granite Hill', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'},
    {name: 'Mountain Goats Rest', image: 'https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/07/main/litter-free-campground-sun-0816.jpg'},
    {name: 'Salmon Creek', image: 'https://www.tripsavvy.com/thmb/B99SUpBFjesrl8TFUJBSrGAY0SA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-508066351-5a12280d9e942700376da496.jpg'},
    {name: 'Granite Hill', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'},
    {name: 'Mountain Goats Rest', image: 'https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/07/main/litter-free-campground-sun-0816.jpg'}
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