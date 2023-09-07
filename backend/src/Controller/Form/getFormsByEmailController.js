import formDataModel from "../../Model/FormDataModel.js"

export const getFormsByEmailController=(req,res)=>{

    const email=req.query.email

    if(!email) {
        return res.send({ status: false, massage: "Please login agian !"})
    }

    formDataModel.findOne({email:email}).then((querRes)=>{
        return res.send({ status: true, data:querRes.forms ,massage: "Forms fetched succusfully"})
    }).catch((queryErr)=>{
        return res.send({ status: false, massage: queryErr})
    })
}