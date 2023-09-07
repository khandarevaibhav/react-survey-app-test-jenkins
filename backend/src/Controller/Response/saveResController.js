import resDataModel from '../../Model/ResDataModel.js';
import formDataModel from '../../Model/FormDataModel.js';
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;


const saveResController = async (req, res) => {

    const email = req.body.email
    const response = { fields: req.body.data, email: email };
    const formID = new ObjectId(req.body.formID);


    const checkAllowDuplicate = async () => {
        var flag = true;
        await formDataModel.aggregate([
            { "$unwind": "$forms" },
            { "$match": { "forms.formID": formID } },
            { "$replaceRoot": { "newRoot": "$forms" } }
        ]).then((querRes1) => {
            flag = querRes1[0].allowDuplicate
        }).catch((queryErr1) => {
            console.log(queryErr1)
        })

        return flag;
    }

    const checkDuplicate = async () => {
        var flag = false;
        await resDataModel.findOne({ formID: formID }, { responses: { $elemMatch: { email } } }).then((queryRes2) => {
            if (queryRes2.responses.length !== 0) {
                flag = true;
            }
        }).catch((queryErr2) => {
            console.log(queryErr2)
        })
        return flag;
    }

    var duplicate = false;
    var allowDuplicate = false;

    allowDuplicate = await checkAllowDuplicate();

    await resDataModel.findOne({ formID: formID }).then(async (queryRes) => {

        if (!queryRes) {
            const newRes = new resDataModel({
                formID: formID,
                responses: [response]
            })

            newRes.save();

            return res.send({ status: true, massage: "response submitted!" })
        }

        else {

            if (allowDuplicate === false) {
                duplicate = await checkDuplicate();
            }

            if (duplicate === true) {
                return res.send({ status: true, massage: "response already submitted!" })
            }

            else {
                await resDataModel.updateOne({ formID: formID }, { $push: { "responses": response } }).then((queryRes3) => {
                    return res.send({ status: true, massage: "response submitted!" })

                }).catch((queryErr3) => {
                    console.log(queryErr3)
                    return res.send({ status: false, massage: queryErr3 })
                })
            }

        }

    }).catch((queryErr) => {
        console.log(queryErr)
        return res.send({ status: false, massage: queryErr })
    })
}

export default saveResController