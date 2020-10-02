const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique:true,
    },
    password: { 
        type: String, 
        required: true,
    },
    location: { 
        type: String,
        required: true,
    },
    access: {
        type: Number,
        default: 0,
    },
    liked_videos: { 
        type: Array,
    }
});

module.exports = mongoose.model('users',users);