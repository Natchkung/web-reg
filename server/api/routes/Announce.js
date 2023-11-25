const express = require('express')
const router = express.Router()

const {
    Createannounce,
    GetAnnounce,
    DeleteAnnounce,
    UpdateAnnounce
} = require('../controllers/Announce.Controller')

const {auth} = require("../Middleware/auth")



router.post('/announce', auth , Createannounce)
router.put('/announce/:id', auth , UpdateAnnounce)
router.delete('/announce/:id', auth , DeleteAnnounce)
router.get('/announce', GetAnnounce)




module.exports = router