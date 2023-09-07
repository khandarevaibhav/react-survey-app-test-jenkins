import userTokenDataModel from "../../Model/UserTokenDataModel.js"

export const logoutController = async (req, res) => {

    const email = req.body.email
    
    userTokenDataModel.updateOne({email:email},{$set:{token:null}}).then((querRes)=>{
        return res.send({ status: true, massage: "Logged out" })
    }).catch(err=>{
        return res.send({ status: false, massage: err})
    })
}
