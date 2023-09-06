import formApi from "../../API/FormData";

const HandleSaveForm = async (email,formConfiguration,formName,formID,allowDuplicate,setDialog) => {
    const accessToken = localStorage.getItem(email);

    if(formName==='' || formName===null) formName="Untitled"

    var emptyLabels = false;

    formConfiguration.map((field) => {
        if (field.label === '' || field.label === null) {
            setDialog("Please add label to all fields!")
            emptyLabels = true
        }
    })

    if (emptyLabels) return false;

    const querRes = await formApi.post("/saveform", {
        formConf: {
            formID: formID,
            formName: formName,
            allowDuplicate: allowDuplicate,
            fields: formConfiguration,
        },
        email: email,
    }, { headers: { 'Authorization': accessToken } });

    if (querRes.data.status === true) {
        console.log("form data saved !")
        return querRes.data.data;
    }

    setDialog(querRes.data.massage)
    return false;
}


export default HandleSaveForm;