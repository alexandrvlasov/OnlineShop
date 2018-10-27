const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    products: [
        {
            id: { type: mongoose.Schema.ObjectId, ref: 'Products' },
            current_price: Number,
            count: Number
        }
    ],
    date: { type: Date, default: Date.now },
    is_done: { type: Boolean, default: false },
    is_wait: { type: Boolean, default: false }
})

module.exports = mongoose.model('Cart', cartSchema)