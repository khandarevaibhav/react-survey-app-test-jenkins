import userTokenDataModel from "../../Model/UserTokenDataModel.js";
import jwt_decode from "jwt-decode";

async function authUser(req, res, next) {
        const token = req.headers.authorization

        
        if (!token) {
            return res.send({ status: false, massage: "User Not Varified!" })
        }
        var decodedValue = jwt_decode(token)

        const email = decodedValue.email

        if(!decodedValue)
            return res.send({ status: false, massage: "Invalid Token!" })

        else {
            userTokenDataModel.findOne({email:email}).then((queryRes)=>{
                if(queryRes.token===token){
                    next();
                }

                else{
                    return res.send({ status: false, massage: "not varified" })
                }
            }).catch(queryEr=>{
                return res.send({ status: false, massage: queryEr })
            })

        }
}


export default authUser