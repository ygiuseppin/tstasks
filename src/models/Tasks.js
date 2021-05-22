const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        required: true
    },
    expires: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Task', TaskSchema);