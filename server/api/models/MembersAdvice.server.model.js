const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembersAdviceSchema = new Schema(
    {
        personalID: Number,
        advice: String,
    },
    {versionKey: false,timestamps:true}
);
const MembersAdvice = mongoose.model('MembersAdvice', MembersAdviceSchema);
module.exports = MembersAdvice;