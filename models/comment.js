const { Schema, model } = require('mongoose');

//  create schema

const commentSchema = new Schema({
    name: String,
    message: String
}, {
    timestamps: true
})

//  model

const Comment = model('Comment', commentSchema)

module.exports = Comment;