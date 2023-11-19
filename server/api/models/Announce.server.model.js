const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnounceSchema = new Schema({
    title: String,
    detail: String,
    announceby: String,
    announcetimes: String,
    announcelink: String
    },
    {versionKey: false,timestamps:true}
);
const Announce = mongoose.model('Announce', AnnounceSchema);
module.exports = Announce;