const express = require('express');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    var campgrounds = [
        {name: 'Salmon Creek', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'},
        {name: 'Granite Hill', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'},
        {name: 'Mountain Goats Rest', image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/blm-camping.jpg'}
    ];
    res.render('campgrounds', {campgrounds: campgrounds});
})

app.get('*', (req, res) => {
    res.send("Are you lost?")
});

app.listen(3000, () => {
    console.log('Server started');
});