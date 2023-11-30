// @Begin Login---
const bcrypt = require('bcrypt'); // @import เข้ารหัส
const Users = require('../models/Users.server.model') //Schema Model
const jwt = require("jsonwebtoken") // allten


exports.login = async (req, res) => {
    try {
        //@check user
        const { username, password } = req.body
        var user = await Users.findOneAndUpdate({ username }, { new: true })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send("Password Invalid!!!")
            }

            //@ payload
            var payload = {
                user: {
                    username: user.username,
                    role: user.role
                }
            }
            //@ Generate
            jwt.sign(payload, 'lovenicky', { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })
        } else {
            return res.status(400).send("User not found!!")
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}

exports.create_users = async (req, res) => {
    try {

        const { username, password,role } = req.body
        var user = await Users.findOne({ username })

        // @ Check User
        if (user) {
            return res.send("Existing User").status(400)
        }
        //
        //@ Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new Users({
            username,
            password,
            role
        })
        user.password = await bcrypt.hash(password, salt)
        //
        await user.save()

        res.send({
            "status": "Account Created !!"
        }).status(200)

    } catch (err) {
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }
}

// exports.CheckcurrentUser = async (req,res) =>{
//     try{
//         const user = await Users.findOne({username:req.user.username})
//         .select('-password')
//         .exec()

//         res.send(user)

//     }catch(err){
//         console.log(err)
//         res.status(500).send({ "Server Error :": err })
//     }

// }

exports.ForgotPassword = async (req,res) =>{
    try{
        res.send('ForgotPassword')

    }catch(err){
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }

}



