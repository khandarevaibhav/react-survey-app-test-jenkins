import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import Navbar from "../Navbar/Navbar";
import resApi from "../../API/ResData";
import { useState } from "react";

const Response = () => {

    const [responses, setResponses] = useState([]);
    const [flag, setFlag] = useState(false)
    const [csvReport, setCSVReport] = useState({});

    const { email, id } = useParams();
    const accessToken = localStorage.getItem(email);


    const [headers, setHeaders] = useState([])

    var ans = [];


    const getResponses = async () => {
        const apiRes = await resApi.get('/getResponsesByID', { params: { formID: id }, headers: { 'authorization': accessToken } })

        if (apiRes.data.status === true) {
            setResponses(apiRes.data.data)
        }

        else {
            console.log(apiRes.data.massage)
            return
        }

        // headers=[]
        apiRes.data.data[0]?.fields?.map((response, index) => {
            var i=headers.findIndex((obj)=> obj.label===response.label)

            if(i===-1)
            headers.push({ label: response.label, key: response.label })

            else{
                headers[i]={ label: response.label, key: response.label };
            }
        })

        ans = []
        apiRes.data.data?.map((res) => {
            const temp = {}
            res.fields.map((res2) => {
                var key = res2.label
                temp[key] = res2.ans;
            })
            ans.push(temp)
        })

        setCSVReport({
            data: ans,
            headers: headers,
            filename: `responses.csv`
        });
        setFlag(true);
    }

    useEffect(() => {
        getResponses();
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <Navbar email={email} />
            <h1>Responses</h1>
            <hr style={{ width: "100%" }} ></hr>
            {
                responses.length!==0 ?
                    <div style={{ border: "2px solid black", marginLeft: "20%", marginRight: "20%", marginTop: "20px", marginBottom: "40px" }}>
                        {
                            responses?.map((response, i) => {
                                return <div style={{ marginBottom: "10px", marginTop: "20px" }}>
                                    <h4 >Response {i + 1}:</h4>
                                    <div key={i}>
                                        {
                                            response?.fields?.map((field, index) => {
                                                return <div key={index}> <div>{field.label}</div> <div>{field.ans}</div> <br></br> </div>
                                            })
                                        }
                                        <hr style={{ width: "100%" }}></hr>
                                    </div>
                                </div>

                            })
                        }

                        {
                            flag ? <CSVLink {...csvReport} className="publish-btn" style={{ marginBottom: "20px", marginTop: "20px" }} >Export to CSV</CSVLink> : <></>
                        }
                    </div>
                    : <div><h3>No Response Found</h3></div>
            }
        </div>
    )
}


export default Response;