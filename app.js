const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Require only routes
const mainRoute = require('./routes/main')
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')
const authRoute = require('./routes/auth')
const cartRoute = require('./routes/cart')
const accountRoute = require('./routes/account')

const config = require('./app-config')
const app = express()

//Connecte to Database
mongoose.connect(config.databaseURL, { useNewUrlParser: true }) // DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.Promise = global.Promise

// Settings app express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Main routes
app.use('/', mainRoute)
app.use('/product', productRoute)
app.use('/category', categoryRoute)
app.use('/auth', authRoute)
app.use('/cart', cartRoute) // shopping cart
app.use('/account', accountRoute)

// Check not found url and res -> Error 404
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ message: error.message })
})

module.exports = app