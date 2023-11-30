const express = require('express')
const router = express.Router()

const {
    login,
    create_users,
    ForgotPassword
} = require('../controllers/Auth.Controller')

const {auth} = require("../Middleware/auth")

//http://localhost:5000/api/product
router.post('/login', login)
router.post('/login/create/create-account_nicky-nutchkung', create_users)
router.post('/Forgot-Password', ForgotPassword)




module.exports = router