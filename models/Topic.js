const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    text: String,
    postedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    }
});

const Reply = new Schema({
    text: String,
    comments: [Comment],
    postedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    }
});

const topicSchema = new Schema({
    title: String,
    slug: String,
    date: Date,
    votes: [{
        votedBy: {
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