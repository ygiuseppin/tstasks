const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    content: String,
    author: String
});

module.exports = mongoose.model('Post', PostSchema);