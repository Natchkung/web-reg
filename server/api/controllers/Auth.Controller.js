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
const nodemailer = require('nodemailer');

exports.ForgotPassword = async (req,res) =>{
    try{
        // @secret code send to email
        // const transporter = nodemailer.createTransport({
        //     host: "smtp.forwardemail.net",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //       // ตรงส่วนนี้แทนด้วย user pass ของเราเลยนะครับ
        //       user: "bernadette.padberg@ethereal.email",
        //       pass: "td3xJj77RSMwT4PSEE",
        //     },
        //   });
        
        //   const msg = {
        //     from: '"Nc-Developer 👻" <@nc-developer.dev>', // อีเมล์ของผู้ส่ง
        //     to: "bernadette.padberg@ethereal.email", // อีเมล์ผู้รับ
        //     subject: "Nc-Developer ✔", // หัวข้อของเมล์
        //     text: "Hello world?", // ส่วนของเนื้อหา
        //     html: "<b>Hello world?</b>",
        //   }
        //     const info = await transporter.sendMail(msg);
        
        //     console.log("Message sent: %s", info);
        //     res.send("Email Sent!!");
          ///

          const secretCode = 'natcncode';
          const data = req.body;
          var forgetpassword = await Users.findOne({username:data.username})
            if(!forgetpassword){
                return res.status(400).send("User not found!!")
            }
            // res.status(200).json(forgetpassword);
            if (data.secretCode === secretCode){
                const salt = await bcrypt.genSalt(10)
                forgetpassword.password = await bcrypt.hash(data.password, salt)
                await forgetpassword.save()
                res.status(200).send("Password Changed!!");
            }else{
                res.status(400).send("Secrect code not match")
            }



    }catch(err){
        console.log(err)
        res.status(500).send({ "Server Error :": err })
    }

}



