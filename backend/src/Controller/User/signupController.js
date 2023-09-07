import bcrypt from 'bcrypt'
import userDataModel from '../../Model/UserDataModel.js'
import userTokenDataModel from '../../Model/UserTokenDataModel.js'
import formDataModel from '../../Model/FormDataModel.js'


export const signupController = async (req, res) => {

    const userCreds = req.body

    const email = userCreds.email;
    const password = userCreds.password;

    if (!email || !password) {
        return res.send({ status: false, massage: "Invalid Details !" })
    }
    
    const queryRes = await userDataModel.findOne({ email: email })

    if (queryRes) {
        res.send({ status: false, massage: "email has already registered!" })
    }

    else {
        const passwordHash = await bcrypt.hash(password, 10)

        const userDBInstance = new userDataModel({
            email: email.toLowerCase(),
            password: passwordHash
        })

        userDBInstance.save();

        const tokenDBInstance= new userTokenDataModel({
            email: email.toLowerCase(),
            token: null
        })

        tokenDBInstance.save();

        const formDBInstance= new formDataModel({
            email: email.toLowerCase()
        })

        formDBInstance.save();

        res.send({ status: true, massage: "user registered succuesfully!" })

    }
}   

export default signupController