const mongoose = require('mongoose')
const Joi = require("joi");
const userModel = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const users = mongoose.model('users', userModel);


module.exports = users