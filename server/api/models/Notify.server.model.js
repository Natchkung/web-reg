const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
    username: String,
    notify: String
    },
    {versionKey: false,timestamps:true}
);
const Notify = mongoose.model('Notify', NotifySchema);
module.exports = Notify;