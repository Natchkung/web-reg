require('dotenv').config()
const Announce = require('../models/Announce.server.model') //Schema Model

exports.Createannounce = async (req, res) => {
    try {
        const data = req.body
        const { title } = data
        var announce = await Announce.findOne({ title })

        if (announce) {
            return res.status(400).send("This announcement already has a name.")
        }

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

exports.DeleteAnnounce = async (req, res) => {
    try {
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
        const { id } = req.params
        const data = req.body
        res.send("UpdateAnnounce")
        

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }

}