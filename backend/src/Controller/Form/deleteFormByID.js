import formDataModel from "../../Model/FormDataModel.js"
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;


export const deleteFormByID=async(req,res)=>{

    console.log(req.query)

    const email=req.query.email
    const formID=req.query.formID

    await formDataModel.updateOne({ email: email }, { $pull: { 'forms': { formID:ObjectId(formID) } } }).then((querRes) => {
        return res.send({ status: true, massage: "Form deleted !" })
    }).catch((queryErr) => {
        console.log(queryErr)
        return res.send({ status: false, massage: queryErr })
    })
}

