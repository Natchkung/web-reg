const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membersSchema = new Schema(
    {
        personalID: Number,
        fname: String,
        lname: String,
        old: Number,
        sex: String,
        height: Number,
        weight: Number,
        SYSmmHg: Number,
        DIAmmhg: Number,
        PULmin: Number,
        photo: {
            type: String,
            default: 'noimage.jpg'
        }
    },
    {versionKey: false,timestamps:true}
);
const Members = mongoose.model('Members', membersSchema);
module.exports = Members;