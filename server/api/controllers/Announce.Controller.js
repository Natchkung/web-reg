require('dotenv').config()
const Announce = require('../models/Announce.server.model') //Schema Model

exports.Createannounce = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }
        
        const data = req.body
        announce = new Announce(data)
        await announce.save()
        res.status(201).send({
            "status": "Announcement form created",
            "playload": data

        })
        // const lineNotify = require('line-notify-nodejs')(process.env.LINKTOKEN);

        // lineNotify.notify({
        //     message: "send message"
        // }).then(() => {
        //     console.log('send completed!');
        // });

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}


exports.GetAnnounce = async (req, res) => {
    try {
        const announce = await Announce.find({})
        res.json(announce);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}

exports.Get_a_Announce = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }

        const { id } = req.params
        const announce = await Announce.findOne({ '_id': id})
        res.json(announce);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}

exports.DeleteAnnounce = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }

        const { id } = req.params
        const announce = await Announce.findByIdAndDelete(id)
        res.json(announce);

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}

exports.UpdateAnnounce = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }
        
        const { id } = req.params
        const data = req.body
        var announce = await Announce.findOne({ _id: id })
    
        if(announce){
            await Announce.updateOne({ _id: id }, data)
            res.status(200).json(announce);
        }else{
            res.status(400).send("Not found")
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }

}