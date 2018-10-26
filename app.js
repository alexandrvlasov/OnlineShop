const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')


const app = express()

app.use('/', (req, res) => {
    res.send('Hello world')
})

module.exports = app