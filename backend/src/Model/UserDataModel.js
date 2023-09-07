import mongoose from "mongoose";

var mod = new mongoose.Schema({ 
    email:String,
    password: String
},{strict: true});

var userDataModel = mongoose.model('userData', mod);

export default userDataModel

