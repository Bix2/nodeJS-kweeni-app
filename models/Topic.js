const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    text: String,
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    }
});

const Reply = new Schema({
    text: String,
    comments: [Comment],
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    }
});

const topicSchema = new Schema({
    title: String,
    date: Date,
    votes: [{
        user: {
            type: Schema.Types.ObjectId, 
            ref: 'Users' 
        }
    }],
    replies: [Reply],
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users',
    },
});


const Topic = mongoose.model('Topics', topicSchema);

module.exports = Topic;