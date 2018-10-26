const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/Product')

router.get('/all', async (req, res) => {
    const products = await Product.find()

    res.status(200).json({
        products: products
    })
})

router.get('/:productId', (req, res) => {
    let productId = req.params.productId

    res.status(200).json({
        message: 'Work',
        productId: productId
    })
})

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        vendorCode: req.body.vendor_code,
        price: req.body.price,
        category: req.body.category_id,
        size: req.body.size
    })
    product.save().then(product => {
        res.status(200).json({ message: 'Success add product', product_data: product })
    }).catch(err => {
        res.status(500).json({ error: err, message: 'There was a problem registering the user.' })
    })
})

module.exports = router