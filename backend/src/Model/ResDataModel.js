import mongoose from "mongoose";
var ObjectId = mongoose.Types.ObjectId;

var mod = new mongoose.Schema({
    "formID": { type: ObjectId, required: true },
    "responses": { type: Array, default: null },

 },{strict: false});

var resDataModel = mongoose.model('resData', mod);

export default resDataModel

