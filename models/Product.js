const mongoose = require('mongoose')

// Require models
//const Category = require('./Category')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    vendorCode: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    priceWholesale: { type: Number }, 
    is_new: { type: Boolean, default: true },
    category: { type: [mongoose.Schema.ObjectId], ref: 'Category' },
    size: { type: [String] }
})

module.exports = mongoose.model('Product', productSchema)