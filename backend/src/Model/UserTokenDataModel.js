import mongoose from "mongoose";

var mod = new mongoose.Schema({
    "email": { type: String, required: true },
    "token": { type: String, default: null },
    "ts": { type: Date, default: Date.now }
}, { strict: true });

var userTokenDataModel = mongoose.model('userTokenData', mod);

export default userTokenDataModel

