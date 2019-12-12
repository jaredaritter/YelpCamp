const mongoose = require('mongoose');
// Comment schema
let commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            red: "User"
        },
        username: String
    }
});
module.exports = mongoose.model("Comment", commentSchema);