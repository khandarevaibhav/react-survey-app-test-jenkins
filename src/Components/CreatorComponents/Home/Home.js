import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar.js'
import formApi from "../../API/FormData.js";
import "./Home.css";
import 'font-awesome/css/font-awesome.min.css';

const Home = (props) => {
  const [forms, setForms] = useState([]);

  const navigate = useNavigate();

  const { email } = useParams()

  const accessToken = localStorage.getItem(email);

  const getForms = async () => {

    const querRes = await formApi.get('/getFormsByEmail', { params: { email: email }, headers: { 'authorization': accessToken } })

    setForms(querRes.data.data)
  }

  const handleDeleteForm = async (e) => {
    const querRes = await formApi.delete('/deleteFormByID', { params: { email: email, formID: e.target.id }, headers: { 'authorization': accessToken } })

    console.log("delete form query res :", querRes.data.massage)
  }


  useEffect(() => {
    getForms();
  })

  return (

    <div className="home-root">
      <Navbar email={email} />


      <div>
        <div className="container-left">



          <div className="main" style={{ marginBottom: "20px" }}><span>Created Forms</span></div>
          {
            forms?.map((form, index) => {
              return <div className="subItem" key={index} style={{ marginBottom: "20px" }} >
                <span id={form.formID} onClick={(e) => {
                  navigate(`/${email}/edit`, { state: { formID: e.target.id } })

                }} className="boxFont">{form.formName}</span>
                <i id={form.formID} style={{ marginLeft: "20px", marginTop: "5px", cursor: "pointer" }} className="fa fa-trash delete" onClick={handleDeleteForm} aria-hidden="true"></i>
                <button id={form.formID} style={{ float: "right", borderColor: "black", backgroundColor: "white", borderRadius: "3px", marginRight: "12px", padding: "5px", margin: "auto", cursor: "pointer" }} onClick={(e) => { navigate(`/${email}/${e.target.id}/responses`) }}>{" "} Responses {" "}</button>
              </div>
            })}

        </div>
      </div >
      <div className="container" style={{ textAlign: "center" }}>
        <button style={{ margin: "auto" }} className="createBtn" onClick={(e) => {
          e.preventDefault();
          navigate(`/${email}/edit`)
        }}><i className="fa fa-solid fa-plus" aria-hidden="true"></i><br />Create New</button>
      </div>
    </div >

  );
};



export default Home;
