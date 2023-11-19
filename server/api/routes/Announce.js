const express = require('express')
const router = express.Router()

const {
    Createannounce,
    GetAnnounce
} = require('../controllers/Announce.Controller')

const {auth} = require("../Middleware/auth")



router.post('/announce', auth , Createannounce)
router.get('/announce', GetAnnounce)




module.exports = router