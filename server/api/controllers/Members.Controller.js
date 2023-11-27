const Members = require('../models/Members.server.model') //Schema Model members
const Users = require('../models/Users.server.model') //Schema Model USers
const fs = require("fs")


// @ Begin Members -- 
exports.list_all_dbs = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }

        const members = await Members.find({});
        res.json(members);
    } catch (error) {
        console.log(error)
        res.status(500).send({ "Server Error :": error })
    }
}

exports.delete_all_dbs = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }

        // @members
        await Members.deleteMany();
        const path = require("path");

        const directory = "./upload_image/";

        await fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                if (file != 'noimage.jpg'){
                    fs.unlink(path.join(directory, file), (err) => {
                        if (err) throw err;
                    });
                }
            }
        });

        // @delete users
        const user = await Users.find({role:"member"})
        if (user){
            await Users.deleteMany({role:"member"});
        }


        res.status(200).send({
            "status": "deleted all,",
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}


exports.create_a_db = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }

        var data = req.body
        const { personalID } = data
        var members = await Members.findOne({ personalID })

        // @ check data user
        if (members) {
            return res.send("Already have user data!").status(400)
        }

        if (req.file) {
            data.photo = req.file.filename
        }

        //@next
        members = new Members(data)
        await members.save()

        // @create user in Users
        const bcrypt = require('bcrypt'); // @import เข้ารหัส

        var user = await Users.findOne({ personalID })

        // @ Check User
        if (user) {
            return res.send("Existing User").status(400)
        }
        //
        //@ Encrypt
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(personalID, salt)

        user = new Users({
            "username": personalID,
            "password": password
        })
        //
        await user.save()

        res.status(201).send({
            "status": "created",
            "payload": data
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
};

exports.read_a_db = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }

        const personalID = parseInt(req.params.personalID);
        const user = await Members.findOne({ "personalID": personalID });
        res.status(200).send({
            "status": "ok",
            "user": user
        });

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}


exports.update_a_db = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }

        var user = req.body;
        const { personalID } = user
        const paramsPersonalID = parseInt(req.params.personalID);
        var members = await Members.findOne({ "personalID": paramsPersonalID })
        var checkuser = await Members.findOne({ personalID })

        if (checkuser && personalID != paramsPersonalID) {
            return res.status(400).send("Already personalID")
        }


        // @ check data user
        if (members) {
            if (req.file) {
                user.photo = req.file.filename
            }
            if (user.personalID != paramsPersonalID) {
                if (members.photo != "noimage.jpg") {
                    await fs.unlink('./upload_image/' + members.photo, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("deleted success!!")
                        }
                    })
                }
            } else
                if (user.personalID == paramsPersonalID && members.photo.slice(-4, -1) + members.photo.slice(-1) != user.photo.slice(-4, -1) + user.photo.slice(-1)) {
                    if (members.photo != "noimage.jpg") {
                        await fs.unlink('./upload_image/' + members.photo, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("deleted success!!")
                            }
                        })
                    }

                }
            await Members.updateOne({ 'personalID': paramsPersonalID }, {
                "$set": {
                    personalID: parseInt(user.personalID),
                    fname: user.fname,
                    lname: user.lname,
                    old: parseInt(user.old),
                    sex: user.sex,
                    height: parseFloat(user.height),
                    weight: parseFloat(user.weight),
                    SYSmmHg: parseFloat(user.SYSmmHg),
                    DIAmmhg: parseFloat(user.DIAmmhg),
                    PULmin: parseFloat(user.PULmin),
                    photo: user.photo,
                }
            });
            res.status(200).send({
                "status": "ok",
                "message": "User with personalID = " + paramsPersonalID + " is updated",
                "user": user
            });

        } else {
            res.send({
                "status": "error",
                "message": "No personalID = " + paramsPersonalID
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })

    }
}

exports.delete_a_db = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).send("Not admin")
        }
        
        
        const personalID = parseInt(req.params.personalID);
        var members = await Members.findOne({ personalID })

        // @ check data user
        if (members) {
            await Members.deleteOne({ 'personalID': personalID });
            await Users.deleteOne({"username": personalID, "role": "member"})
            if (members?.photo) {
                if (members.photo != "noimage.jpg") {
                    await fs.unlink('./upload_image/' + members.photo, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("deleted success!!")
                        }
                    })
                }
            }
            res.status(200).send({
                "status": "ok",
                "message": "User with ID = " + personalID + " is deleted"
            });

        } else {
            res.status(400).send({
                "status": "error",
                "message": "No personalID = " + personalID
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}

// @ end Members