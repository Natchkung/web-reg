const mongoose = require('mongoose');

module.exports = async function connection(){
    try{
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.UNKNOW_URL,connectionParams);
        console.log("Connected to Database.")
    }
    catch (error){
        console.log(error)
        console.log("Could not Connect to Database.")
    }
};