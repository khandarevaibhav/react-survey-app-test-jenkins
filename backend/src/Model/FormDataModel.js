import mongoose from "mongoose";

var mod = new mongoose.Schema({
    "email": { type: String, required: true },
    "forms": { type: Array, default: null },

 },{strict: false});

var formDataModel = mongoose.model('formData', mod);

export default formDataModel

