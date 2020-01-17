const Campground = require('../models/campground'),
      Comment = require('../models/comment');

// MIDDLEWARE GOES HERE

// CONST MAY CAUSE PROBLEMS
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash('error', 'Could not find campground');
                res.redirect('back');
            } else {
                // does user own campgrounds?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash('error', 'Could not find comment');
                res.redirect('back');
            } else {
                // does user own comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
}

module.exports = middlewareObj