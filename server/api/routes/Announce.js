const express = require('express')
const router = express.Router()

const {
    Createannounce,
    GetAnnounce,
    DeleteAnnounce,
    UpdateAnnounce,
    Get_a_Announce,
} = require('../controllers/Announce.Controller')

const {auth} = require("../Middleware/auth")



router.post('/announce', auth , Createannounce)
router.get('/announce/:id', auth , Get_a_Announce)
router.put('/announce/:id', auth , UpdateAnnounce)
router.delete('/announce/:id', auth , DeleteAnnounce)
router.get('/announce', GetAnnounce)




module.exports = router