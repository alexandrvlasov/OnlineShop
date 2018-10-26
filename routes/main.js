const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Hello world')
})

module.exports = router