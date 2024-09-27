const mongoose = require('mongoose')

const schemaBooks = mongoose.Schema({
    id: {type: String, required: true},
    userId: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    genre: {type: String, required: true},
    ratings: [
        {
            userId: {type: String, required: false},
            grade: {type: Number, required: false}
        }
    ],
    averageRating: {type: Number, required: false},
    validate: {type: Boolean, required: false}
})

module.exports = mongoose.model('Books', schemaBooks)