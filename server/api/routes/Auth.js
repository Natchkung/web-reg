const express = require('express')
const router = express.Router()

const {
    login,
    create_users
} = require('../controllers/Auth.Controller')



//http://localhost:5000/api/product
router.post('/login', login)
router.post('/login/create/create-account_nicky-nutchkung', create_users)




module.exports = router