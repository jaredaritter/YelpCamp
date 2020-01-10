const express = require('express'),
      router = express.Router({mergeParams: true}),
      Campground = require('../models/campground'),
      Comment = require('../models/comment');

// NEW COMMENT
router.get('/new', isLoggedIn, (req, res) => {
    // Find campground by ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

// CREATE COMMENT
router.post('/', isLoggedIn, (req, res) => {
    // get campground info
    console.log(req.params.id);
    console.log(typeof req.params.id);
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // save comment
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

// EDIT COMMENT
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect('back');
        }  else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    })
})

// UPDATE COMMENT
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

// DESTROY COMMENT
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})


//MIDDLEWARE
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect('back');
            } else {
                // does user own comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        })
    } else {
        res.redirect('back');
    }
}

// MODULES
module.exports = router;