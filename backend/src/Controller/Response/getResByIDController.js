
import resDataModel from '../../Model/ResDataModel.js';
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;


const getResByIDController = async (req, res) => {

    const formID=new ObjectId(req.query.formID);

    await resDataModel.findOne({formID:formID}).then((queryRes)=>{

        if(queryRes)
        return res.send({ status: true,data:queryRes.responses, massage: "Responses Fetched!" })

        else
        return res.send({ status: false, massage: "No Response Found" })


    }).catch((queryErr)=>{
        console.log(queryErr)
        return res.send({ status: false, massage: queryErr })
    })
}

export default getResByIDController