import mongoose from "mongoose";


import dotenv from 'dotenv';

import conf from '../Config/test.json' assert { type: "json" };

const mongConnection = () => {
    const conn_url = conf.mongo.url;

    console.log(conn_url)
    mongoose.connect(conn_url, {
        useNewUrlParser: "true",
    })


    mongoose.connection.on("error", err => {
        console.log("err", err)
    })


    mongoose.connection.on("connected", (err, res) => {
        console.log("mongoose is connected")
    })
}

export default mongConnection;