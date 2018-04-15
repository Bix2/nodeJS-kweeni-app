const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    name: String,
    avatar: String
})

const User = mongoose.model('Users', userSchema);

module.exports = User;