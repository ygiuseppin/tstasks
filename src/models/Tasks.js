const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        default: null 
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