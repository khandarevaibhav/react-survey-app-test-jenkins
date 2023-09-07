import formDataModel from '../../Model/FormDataModel.js'
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;


const saveFormConfController = async (req, res) => {

    const form = req.body.formConf

    const email = req.body.email

    if (!form.formID) {
        form.formID=new ObjectId();
        await formDataModel.updateOne({ email: email }, { $push: { forms: form } }).then(() => {
            return res.send({ status: true,data:{formID:form.formID}, massage: "Form data saved" })
        }).catch((queryErr) => {
            return res.send({ status: false, massage: queryErr })
        })
    }

    else{
        form.formID= new ObjectId(form.formID);
        await formDataModel.updateOne({
            email: email,
            "forms.formID": new ObjectId(form.formID)
        },
        { $set: { "forms.$": form } }).then((queryRes)=>{
            return res.send({ status: true,data:{formID:form.formID}, massage: "Form data saved" })
        }).catch((queryErr)=>{
            console.log(queryErr)
            return res.send({ status: false, massage: queryErr })
        })
    }



}

export default saveFormConfController