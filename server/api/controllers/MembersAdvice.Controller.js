require('dotenv').config()
const MembersAdvice = require('../models/MembersAdvice.server.model') //Schema Model

exports.CreateMembersAdvice = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }
        
        const data = req.body
        membersAdvice = new MembersAdvice(data)
        await membersAdvice.save()
        res.status(201).send({
            "status": "membersAdvice form created",
            "playload": data

        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}


exports.GetMembersAdvice = async (req, res) => {
    try {
        const membersAdvice = await MembersAdvice.find({})
        res.json(membersAdvice);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}

// exports.Get_a_Announce = async (req, res) => {
//     try {
//         if(req.user.role !== "admin"){
//             return res.status(400).send("Not admin")
//         }

//         const { id } = req.params
//         const announce = await Announce.findOne({ '_id': id})
//         res.json(announce);

//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ "Server Error :": err })
//     }
// }

// exports.DeleteAnnounce = async (req, res) => {
//     try {
//         if(req.user.role !== "admin"){
//             return res.status(400).send("Not admin")
//         }

//         const { id } = req.params
//         const announce = await Announce.findByIdAndDelete(id)
//         res.json(announce);

//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ "Server Error :": err })
//     }
// }

// exports.UpdateAnnounce = async (req, res) => {
//     try {
//         if(req.user.role !== "admin"){
//             return res.status(400).send("Not admin")
//         }
        
//         const { id } = req.params
//         const data = req.body
//         var announce = await Announce.findOne({ _id: id })
    
//         if(announce){
//             await Announce.updateOne({ _id: id }, data)
//             res.status(200).json(announce);
//         }else{
//             res.status(400).send("Not found")
//         }
        
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ "Server Error :": err })
//     }

// }