const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetails = new Schema({
    useremail:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userDetails);

module.exports = User;