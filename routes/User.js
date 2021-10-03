const express = require('express');
const user = require('../models/user');
const router = express.Router()

// Importing UserSchema
const User = require('../models/user');

// User login api
router.post('/login', (req, res) => {
    // Find user with requested user
    user.findOne({ email: req.body.email }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found"
            })
        } else {
            if (user.validPassword(req.body.password)) {
                return res.status(201).send({
                    message: "User Logged In"
                })
            }
             else {
                return res.status(400).send({
                    message: "Worng Password"
                })
            }
        }
    })
})

// User SignUp api
router.post('/signup', (req, res, next) => {
    // Create Empty user object
    let newUser = new User();
    // Initialize newUser object with request data
    newUser.name = req.body.name,
        newUser.email = req.body.email
    //Call setPassword function tlo hash password
    newUser.setPassword(req.body.password);
    //save newUser object to database
    newUser.save((err, User) => {
        if (err) {
            return res.status(400).send({
                message: "Failed to add user."
            })
        } else {
            return res.status(201).send({
                message: "User added successfully"
            })
        }
    })
})

module.exports = router;