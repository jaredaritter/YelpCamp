const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

// ROOT
      router.get('/', (req, res) => {
    res.render('landing');
});

// REGISTER
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
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
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),
    (req, res) => {
    // unneeded callback kept for showing standard formats
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;