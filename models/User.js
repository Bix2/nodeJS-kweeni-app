const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    name: String,
    avatar: String
}, { timestamps: true});

const User = mongoose.model('Users', userSchema);

module.exports = User;