const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: String,
    password: String,
    // email: String,
    role: {
        type: String,
        default: 'member'
    }
    },
    {versionKey: false,timestamps:true}
);
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;