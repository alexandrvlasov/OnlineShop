const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    phone: String,
    country: String,
    city: String,
    avatarImg: String,
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)