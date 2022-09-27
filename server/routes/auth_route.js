const express = require('express')
const authControllers = require('../controllers/auth/authControllers')
const router = express.Router()

router.post('/register', authControllers.controllers.postRegister)

router.post('/login', authControllers.controllers.postLogin)

module.exports = router