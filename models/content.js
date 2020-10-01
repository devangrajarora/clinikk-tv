const mongoose = require('mongoose');

const content = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true,
    },
    description: { 
        type: String,
        required: true,
    },
    category: { 
        type: Array, 
        required: true,
    },
    likes: { 
        type: Number,
    },
    content_link: { 
        type: String,
        required: true,
    },
    uploaded_at: { 
        type: Date,
        required: true,
    },
    uploaded_by: { 
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('content',content);
