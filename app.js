const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Require only routes
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')

const config = require('./config-app')
const app = express()

//Connecte to Database
mongoose.connect(config.databaseURL, { useNewUrlParser: true }) // DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.Promise = global.Promise

// Settings app express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Main routes
app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})
app.use('/product', productRoute)
app.use('/category', categoryRoute)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404

    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app