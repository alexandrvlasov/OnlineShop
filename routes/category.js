const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// Require models 
const Category = require('../models/Category')

router.get('/', async (req, res) => {
    const categorys = await Category.find((err, categorys) => {
        if (err) { 
            res.status(500).json({ message: "Haven't any categorys", error_message: err.message })
        }

        res.status(200).json({ categorys: categorys })
    })
})

router.post('/', (req, res) => {
    Category.find({ name: req.body.categoryName }).exec().then(category => {
        if (category.length > 0) {
            res.status(500).json({
                message: "Faild create new category, becose this category created",
                error_message: err.message
            })
        } else {
            new Category({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.categoryName
            }).save((err, category) => {
                if (err) { 
                    res.status(500).json({
                        message: "Faild create new category",
                        error_message: err.message
                    })
                }
        
                res.status(200).json({
                    message: "Success create category",
                    category: category
                })
            })
        }

    }).catch(err => {
        res.status(500).json({ message: "Faild create new category", error_message: err.message })
    })
})

router.get('/:categoryId', (req, res) => {
    Category.findById(req.params.categoryId).exec().then(category => {
        res.status(200).json({ category: category })
    }).catch(err => {
        res.status(500).json({ message: "Don't have this category", error_message: err.message })
    })
})

module.exports = router