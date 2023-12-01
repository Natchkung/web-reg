const express = require('express')
const router = express.Router()

const {
    login,
    create_users,
    ForgotPassword,
    RequestSecretcode
} = require('../controllers/Auth.Controller')

const {auth} = require("../Middleware/auth")

//https://unknowkubbrother.net:5000/api/product
router.post('/login', login)
// router.post('/login/create/create-account_nicky-nutchkung', create_users)
router.post('/Forgot-Password', ForgotPassword)
router.post('/Request-Secretcode', RequestSecretcode)




module.exports = router