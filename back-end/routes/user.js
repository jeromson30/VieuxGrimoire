const express = require('express')
const router = express.Router()
const ctrlAuth = require('../controllers/user')


router.post('/signup', ctrlAuth.signupUser)

router.post('/login', ctrlAuth.loginUser)

module.exports = router