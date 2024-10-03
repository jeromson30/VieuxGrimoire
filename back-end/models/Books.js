const mongoose = require('mongoose')

const schemaRating = mongoose.Schema({
    userId: {type: String, required: true},
    grade:{type: Number, required: true}
})

const schemaBooks = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    genre: {type: String, required: true},
    ratings: [schemaRating],
    averageRating: {type: Number, required: false}
})



module.exports = mongoose.model('books', schemaBooks)