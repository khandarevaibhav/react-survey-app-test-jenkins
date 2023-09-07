import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from '../Routes/userRoutes.js';
import forRoutes from '../Routes/formRoutes.js' 
import responseRoutes from '../Routes/responseRoutes.js'
import conf from '../Config/test.json' assert { type: "json" };


const app=Express();

const port=conf.node.port;


app.use(bodyParser.json());
app.use(cors());

app.use('/user',userRoutes);
app.use('/form',forRoutes);
app.use('/response',responseRoutes)

app.get('/',(req,res)=>{
    res.send("welcome to api")
})

app.listen(port,(err)=>{
    if(err) console.log("Error :",err)

    else {
        console.log("App is starting on port 5000...")
    }
})

export default app