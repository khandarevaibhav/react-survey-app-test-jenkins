import userApi from "../API/UserData.js";


const handleLogin = async (userCred,setDialog) => {

    const res = await userApi.post('/login', userCred);
    
    if(res.data.status===true){
        localStorage.setItem(userCred.email, res.data.token)
        return true;
    }
    else{
        setDialog(res.data.massage)
    }
    
    console.log(res.data.massage)
    return false;
}

export default handleLogin;