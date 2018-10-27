const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// Require models 
const Product = require('../models/Product')
const Category = require('../models/Category')

router.get('/all', async (req, res) => {
    const products = await Product.find()

    res.status(200).json({
        products: products
    })
})

router.get('/:productId', (req, res) => {
    Product.findById(req.params.productId).exec().then(product => {
        let categoryArr = [ 'Hello', 'new' ]
        
        if (product.category) {
            const categoryIdArray = product.category

            categoryIdArray.forEach(categoryId => {
                console.log(categoryId)
                Category.findById(categoryId).select('name image').exec().then(category => {
                    
                    categoryArr.push(category.name)
                }).catch(err => {
                    res.status(500).json({ error: err.message })
                })
            })
        }
        console.log(`array: ${categoryArr}`) // `name: ${category.name}, img: ${category.image}`

        res.status(200).json({ product: product, category: 'categoryArr' })
    }).catch(err => {
        res.status(500).json({ error: err.message, message: 'There was a problem with this product.' })
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
        res.status(500).json({ error: err.message, message: 'There was a problem create product.' })
    })
})

module.exports = router