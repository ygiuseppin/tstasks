const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    content: String,
    author: String
});

module.exports = mongoose.model('Task', TaskSchema);