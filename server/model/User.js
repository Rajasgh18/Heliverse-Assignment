const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: ""
    },
    domain: {
        type: String,
        require: true
    },
    available: {
        type: Boolean,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);