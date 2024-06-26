import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {port, mongodburl} from "./config.js";
import router from "./Routes/flightupdate.js";
import route from "./Routes/registration_page.js";
const app = express();


app.use(express.json());

app.use(cors());

app.use('/DeccanFlights',router,route);

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("checking status");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

mongoose.connect(mongodburl).then(()=>{
    console.log("Connected to database");
}).catch((error)=>{
    console.log("Error in connection");
})