const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    body: String,
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

const Reply = new Schema({
    body: String,
    comments: [Comment],
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

const topicSchema = new Schema({
    body: String,
    date: Date,
    votes: [{
        author: {
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        }
    }],
    replies: [Reply],
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
    },
});


const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;