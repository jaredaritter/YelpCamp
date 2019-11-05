const mongoose = require('mongoose');
// Comment schema
let commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
module.exports = mongoose.model("Comment", commentSchema);