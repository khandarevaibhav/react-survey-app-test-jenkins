import formDataModel from "../../Model/FormDataModel.js";
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;



export const getFormByIDControlller = async (req, res) => {

    const id = req.query.formID
    var email=req.query.email


    if(email){
        await formDataModel.aggregate([
            { "$match": { "email": email } }, 
            {"$unwind": "$forms"}, 
            {"$match": {"forms.formID": ObjectId(id)}},
            {"$replaceRoot": {"newRoot": "$forms"}}
        ]).then((querRes) => {
            return res.send({ status: true, data: querRes[0], massage: "Form data fetched" })
        }).catch((queryErr) => {
            console.log(queryErr)
            return res.send({ status: false, massage: queryErr })
        })
    }
    else{
        await formDataModel.aggregate([
            {"$unwind": "$forms"}, 
            {"$match": {"forms.formID": ObjectId(id)}},
            {"$replaceRoot": {"newRoot": "$forms"}}
        ]).then((querRes) => {
            return res.send({ status: true, data: querRes[0], massage: "Form data fetched" })
        }).catch((queryErr) => {
            console.log(queryErr)
            return res.send({ status: false, massage: queryErr })
        })
    }
}

