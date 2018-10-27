const mongoose = require('mongoose')

// Require models
//const Category = require('./Category')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    vendorCode: { type: String, required: true },
    description: String,
    price: Number,
    priceWholesale: Number, 
    is_new: Boolean,
    category: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }],
    size: [String]
})

module.exports = mongoose.model('Product', productSchema)