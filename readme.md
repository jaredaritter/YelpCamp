# YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

* Each Campground has: 
    *  Name
    * Image

## Layout and Basic Styling

* Create our header and footer partials
* Add in Bootstrap

## Creating New Campgrounds

* Setup new compgrounds POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyles form

## Style the campgrounds page

* Add a better header/title
* Make campgrounds display in a grid

## Add Mongoose

* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes!

## Readme incomplete for middle section of course. Will not be backtracking to make complete, only resuming at current position.

## Users + Comments

* Associate users and comments
* Save author's name to a comment automatically

## Users + Campgrounds
* Prevent an unauthenticated user from creasting a campground
* Save username + id to newly created campground

## Editing Campgrounds 
* Add Method-Override
* Add Edit route for campgrounds
* Add Link to Edit page
* Add Update route
* Fix $set problem

## Deleting Campgrounds
* Add Destroy route
* Add Delete button

## Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

## Editting Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campground Edit Route:  <!-- /campgrounds/:id/edit -->
Comment Edit Route:     <!-- /campgrounds/:id/comments/:comment_id/edit -->

## Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route:  <!-- /campgrounds/:id -->
Comment Destroy Route:     <!-- /campgrounds/:id/comments/:comment_id -->

## Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware