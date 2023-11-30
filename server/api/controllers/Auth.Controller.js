// @Begin Login---
const bcrypt = require("bcrypt"); // @import เข้ารหัส
const Users = require("../models/Users.server.model"); //Schema Model
const jwt = require("jsonwebtoken"); // allten

exports.login = async (req, res) => {
  try {
    //@check user
    const { username, password } = req.body;
    var user = await Users.findOneAndUpdate({ username }, { new: true });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }

      //@ payload
      var payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      //@ Generate
      jwt.sign(payload, "lovenicky", { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User not found!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ "Server Error :": err });
  }
};

exports.create_users = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    var user = await Users.findOne({ username });

    // @ Check User
    if (user) {
      return res.send("Existing User").status(400);
    }
    //
    //@ Encrypt
    const salt = await bcrypt.genSalt(10);
    user = new Users({
      username,
      password,
      role,
    });
    user.password = await bcrypt.hash(password, salt);
    //
    await user.save();

    res
      .send({
        status: "Account Created !!",
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ "Server Error :": err });
  }
};

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

exports.RequestSecretcode = async (req, res) => {
  const nodemailer = require("nodemailer");
  const { email } = req.body;
  const secretCode = (Math.random() + 1).toString(36).substring(7);
  // @secret code send to email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    user: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // ตรงส่วนนี้แทนด้วย user pass ของเราเลยนะครับ
      type: "login",
      user: "natchnon654321@gmail.com",
      pass: "kbum yunu vhpn ngdt",
    },
  });

  const msg = {
    from: "natchnon654321@gmail.com", // อีเมล์ของผู้ส่ง
    to: email, // อีเมล์ผู้รับ
    subject: "Unknowkubbrother SecretCode", // หัวข้อของเมล์
    text: "SecretCode", // ส่วนของเนื้อหา
    html: `<h1>SecretCode</h1><br><p>SecretCode => <b>${secretCode}</b></p>`,
  };

  const message = await transporter.sendMail(msg);
  if (message){
    res.status(200).send("Send SecretCode Success!!");
  }
  ////
};

exports.ForgotPassword = async (req, res) => {
  //ยังไม่เสร็จ
  try {
    const data = req.body;
    var forgetpassword = await Users.findOne({ username: data.username });
    if (!forgetpassword) {
      return res.status(400).send("User not found!!");
    }
    // res.status(200).json(forgetpassword);
    if (data.secretCode === secretCode) {
      const salt = await bcrypt.genSalt(10);
      forgetpassword.password = await bcrypt.hash(data.password, salt);
      await forgetpassword.save();
      res.status(200).send("Password Changed!!");
    } else {
      res.status(400).send("Secrect code not match");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ "Server Error :": err });
  }
};
