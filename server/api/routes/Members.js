const express = require('express')
const router = express.Router()

const {
    list_all_dbs,
    create_a_db,
    delete_all_dbs,
    read_a_db,
    update_a_db,
    delete_a_db
} = require('../controllers/Members.Controller')

const {
    CreateMembersAdvice,
    GetMembersAdvice
} = require('../controllers/MembersAdvice.Controller')

const {auth} = require("../Middleware/auth")
const {upload} = require("../Middleware/upload")



//http://localhost:5000/api/product
router.get('/members', auth, list_all_dbs)
router.post('/members', auth, upload, create_a_db)
router.delete('/members', auth, delete_all_dbs)
router.get('/members/:personalID', auth, read_a_db)
router.put('/members/:personalID', auth, upload, update_a_db)
router.delete('/members/:personalID', auth, delete_a_db)


//////// advice
router.post('/membersadvice', auth, CreateMembersAdvice)
router.get('/membersadvice', auth, GetMembersAdvice)




module.exports = router