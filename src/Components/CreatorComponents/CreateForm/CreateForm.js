import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MCQ from "../Elements/MCQ.js";
import ShortAns from "../Elements/ShortAns.js";
import Date from "../Elements/Date.js";
import Heading from "../Elements/Heading.js";
import Email from "../Elements/Email.js";
import LongAns from "../Elements/LongAns.js";
import Phone from "../Elements/Phone.js";
import Time from "../Elements/Time.js";
import formApi from "../../API/FormData.js";
import FileUpload from "../Elements/FileUpload.js";
import Address from "../Elements/Address.js";
import Checkbox from "../Elements/Checkbox.js";
import Navbar from "../Navbar/Navbar.js";
import Preview from "../Preview/Preview.js";
import HandleSaveForm from "./HandleSaveForm.js";
import "./CreateForm.css";

const counts = {
    email: 0,
    date: 0,
    time: 0,
    address: 0,
    tel: 0,
    MCQ: 0,
    checkbox: 0,
    shortAns: 0,
    longAns: 0,
    fileUpload: 0
}


const CreateForm = (props) => {
    const [dialog, setDialog] = useState("");
    const [formConfiguration, setFormConfiguration] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { email } = useParams();

    const [showPreview, setShowPreview] = useState(false);
    const [fields, setFields] = useState([])
    const [name, setName] = useState("")
    const [allowDuplicate, setAllowDuplicate] = useState(false);

    const accessToken = localStorage.getItem(email);

    var formID = ""

    if (location.state) formID = location.state.formID


    const Components ={
        "email":Email,
        "date":Date,
        "time":Time,
        "address":Address,
        "tel":Phone,
        "MCQ":MCQ,
        "checkbox":Checkbox,
        "shortAns":ShortAns,
        "longAns":LongAns,
        "file":FileUpload,
    }


    var elements = [
        { name: "email" },
        { name: "date" },
        { name: "time" },
        { name: "address" },
        { name: "tel" },
        { name: "MCQ" },
        { name: "checkbox" },
        { name: "shortAns" },
        { name: "longAns" },
        { name: "file" },
    ];

    const setComponentList = (type, id, label, options) => {

        const Comp =Components[type];

        setFields((oldFields) => ([
            ...oldFields,
            <Comp   id={id}
            label={label}
            options={options}
            addFormConfiguration={addFormConfiguration}/>
        ]));
    }

    const renderForm = (formData) => {
        setName(formData.formName)
        setAllowDuplicate(formData.allowDuplicate)
        setFields([])

        formData.fields.map((form) => {
            setComponentList(form.type, form.id, form.label, form.options)
        });
    }

    const getFormData = async () => {
        const apiRes = await formApi.get("/getFormByID", {
            params: { formID: formID, email: email },
            headers: { 'authorization': accessToken }
        });

        if (apiRes.data.status === false) return setDialog("Something went wrong!");

        else {
            renderForm(apiRes.data.data);
        }
    };

    useEffect(() => {
        if (formID) {
            getFormData();
        }
    }, [])

    const addFormConfiguration = (field) => {
        var objIndex = formConfiguration.findIndex(
            (obj) => obj.id === field.id
        );
        if (objIndex === -1) {
            formConfiguration.push(field);
        } else {
            formConfiguration[objIndex] = field;
        }
    };

    const handlePublish = async () => {
        const res = await HandleSaveForm(email, formConfiguration, name, formID, allowDuplicate,setDialog);

        if (res) {
            navigate(`/${email}/publish`, { state: { formID: res.formID } });
        }
    };

    //Drag and drop handlers
    const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("fieldID", id);
    };

    const onDragOver = (ev) => {
        ev.preventDefault();
    };

    const onDrop = (ev) => {
        ev.preventDefault();
        var type = ev.dataTransfer.getData("fieldID");
        var label = ""
        var id = `${type}_${counts[type]}`
        var options = ['option 1']

        setComponentList(type, id, label, options)
    };

    var allElements = [];

    elements.forEach((el) => {
        allElements.push(
            <button
                className="elements-btn"
                key={el.name}
                onDragStart={(e) => onDragStart(e, el.name)}
                draggable
            >
                {el.name}
            </button>
        );
    });

    return (
        <div>
            <Navbar email={email} />

            {showPreview ? <div> <Preview setShowPreview={setShowPreview} formConf={formConfiguration} /> </div>
                : <div className="container-root1">
                    <div className="container-drag">
                        <div className="task-header">
                            <h2>All Elements</h2>
                        </div>

                        <div
                            className="elementList"
                            onDragOver={(e) => onDragOver(e)}
                            onDrop={(e) => {
                                onDrop(e);
                            }}
                        >
                            {allElements}
                        </div>
                    </div>

                    {/* right container */}
                    <div className="container-right" id="container-right">
                        <div className="task-header">
                            <h2>Form</h2>
                        </div>
                        <Heading name={name} key={name} addFormName={setName} />

                        <div style={{ marginBottom: "50px" }} className="element-name">
                            <label className="element-input element-gap element-border-style">Enter Your Email</label>
                            <br></br>
                            <input className="element-input element-gap element-border-style" placeholder="user email here" />
                            <hr style={{ width: "100%" }}></hr>
                        </div>

                        <ul>
                            {fields.map((el, index) => {
                                return (
                                    <li className="added-elements" key={index}>
                                        {el}
                                    </li>
                                );
                            })}
                        </ul>

                        <div
                            className="droppable-area"
                            onDragOver={(e) => onDragOver(e)}
                            onDrop={(e) => onDrop(e)}
                            id="target-div"
                        >
                            <div className="drag-text">Drag Here</div>
                        </div>

                        <div>
                            <label>Allow Duplicate</label>
                            <input type="checkbox" checked={allowDuplicate} onChange={(e) => { setAllowDuplicate(e.target.checked) }}></input>
                        </div>

                        <div style={{ marginTop: "30px", marginBottom:"30px" }}>
                            <h4 style={{ color: "red",textAlign:"center" }}>{dialog}</h4>
                        </div>

                        <div className="publish-preview-btn">
                            <div className="publish-btn-div">
                                <button className="publish-btn" onClick={handlePublish}>
                                    Publish{" "}
                                </button>
                            </div>

                            <div className="publish-btn-div">
                                <button className="publish-btn" onClick={(e) => {
                                    setShowPreview(true);
                                }}>
                                    Preview{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}


export default CreateForm;
