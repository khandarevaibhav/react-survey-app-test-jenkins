import React from 'react'
import formApi from "../API/FormData";
import resApi from '../API/ResData.js'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const UserEnd = (props) => {

    const [email, setEmail] = useState("")
    const [form, setForm] = useState([])
    const [formName, setFormName] = useState("")
    const [dailog, setDialog] = useState("")

    const { id } = useParams()
    const formID = id

    const getForm = async () => {

        const apiRes = await formApi.get('/userEnd/getFormByID', { params: { formID: formID } })

        setForm(apiRes.data.data.fields)
        setFormName(apiRes.data.data.formName)
    }

    const handleAnswerChange = (e) => {

        var objIndex = form.findIndex(
            (obj) => obj.id === e.target.id
        );

        form[objIndex].ans = e.target.value;
    }

    const handleOptionChange = (e) => {

        var objIndex = form.findIndex(
            (obj) => obj.id === e.target.name
        );

        form[objIndex].ans = e.target.value;
    }

    const hanadleSubmit = async (e) => {
        e.preventDefault();
        var atposition = email.indexOf("@");
        var dotposition = email.lastIndexOf(".")

        //validation
        if (email === '' || email === null) {
            setDialog("Please enter your email !")
        }

        else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
            setDialog("Please enter a valid e-mail address");
        }

        else {
            const apiRes = await resApi.post('/saveresponse', { data: form, formID: formID, email: email })

            setDialog(apiRes.data.massage)
        }

    }


    useEffect(() => {
        getForm()
    }, [])

    return (
        <div style={{ marginTop: "20px", marginBottom: "50px", width: "100%", textAlign: "center", margin: "auto" }}>
            <div >
                <h1>
                    User End
                </h1>
            </div>

            <div>
                <h3>{formName}</h3>
            </div>

            <div style={{ border: "2px solid black", marginLeft: "20%", marginRight: "20%", marginTop: "20px", marginBottom: "40px" }}>
                <div style={{ marginBottom: "20px" }}>
                    <label>Enter Your Email</label>
                    <br></br>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    <hr style={{ textAlign: "center", margnin: "auto", width: "100%" }}></hr>
                </div>

                <div>
                    {
                        form?.map((field, index) => {
                            return (
                                <div key={index} className="added-elements" >
                                    <label className="element-name">{field.label}</label>

                                    <br />
                                    {
                                        field.options ?
                                            <div>
                                                {
                                                    field.options.map((op, index) => {
                                                        return (
                                                            <div key={index} className="element-input">
                                                                <input type="radio" value={op} onChange={(e) => handleOptionChange(e)} name={field.id} />
                                                                <span> </span>
                                                                <label>
                                                                    <span className="element-border-style" id={index} placeholder="Enter your option" >{op}</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    })
                                                }

                                            </div>
                                            : <div>
                                                {
                                                    field.type !== 'longAns' ?
                                                        <input type={field.type} id={field.id} className="element-input" onChange={(e) => { handleAnswerChange(e) }} />
                                                        : <textarea id={field.id} className="element-input" name="text" rows="10" cols="30" onChange={(e) => { handleAnswerChange(e) }}></textarea>}
                                            </div>
                                    }
                                    <br />
                                    <hr style={{ textAlign: "center", margnin: "auto", width: "100%" }}></hr>
                                </div>
                            );
                        })
                    }
                </div>
                <button style={{ textAlign: "center", margin: "auto", marginBottom: "20px", }} className="publish-btn" onClick={(e) => { hanadleSubmit(e) }}>Submit</button>
            </div>
            <div style={{ marginTop: "30px",marginBottom:"50px" }}>
                <h4 style={{ color: "black" }}>{dailog}</h4>
            </div>
        </div>
    )

}


export default UserEnd