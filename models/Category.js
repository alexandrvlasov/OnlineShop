const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    image: String
})

module.exports = mongoose.model('Category', categorySchema)