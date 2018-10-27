const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()

// Connect local files (Models, Controllers)
const User = require('../models/User')

// Connect config file
const secret = require('../app-config').secret

router.post('/login', (req, res) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length <= 0) { 
            res.status(500).json({ message: 'Auth failed' }) 
        } else {
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({ message: 'Password incorectly' })
                }
        
                if (result) {
                    const token = jwt.sign({ id: user[0]._id }, secret, { expiresIn: "3h" })
        
                    return res.status(200).json({
                        message: 'Auth successful',
                        auth: true,
                        user: user,
                        userId: user[0]._id,
                        token: token
                    })
                }
              })
        }
    }).catch(err => {
        res.status(500).json({ error: err, message: 'User not have' })
    })
})

router.post('/signup', (req, res) => {
    User.find({ email: req.body.email }).select('_id').exec().then(user => {
        if (user.length > 0) {
            res.status(409).json({ message: 'Mail exists' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) { return res.status(500).json({ error: err.message }) }
    
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })
                
                user.save().then(user => {
                    // create a jwt token
                    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "3h" })

                    res.status(200).json({ message: 'Success signup', auth: true, token: token, result_message: user })
                }).catch(err => {
                    res.status(500).json({
                        error: err.message,
                        message: 'There was a problem registering the user.'
                    })
                })
            })
        }
    })
})

module.exports = router