const mongoose = require('mongoose');
const Schema = mongoose.Schema;

getNowDate = function(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    let time = today.getHours() + ":" + today.getMinutes();
    return date+' '+time;
}

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
        },
        time: {
            type: String,
            default: getNowDate()
        },
    },
    {versionKey: false,timestamps:true}
);
const Members = mongoose.model('Members', membersSchema);
module.exports = Members;