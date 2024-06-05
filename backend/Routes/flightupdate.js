import express from "express";
import { flight } from "../Models/flight.js";
import { ticket } from "../Models/schema.js";

const router = express.Router();

router.get('/flightAvailable',async(request,response)=>{
    try{
        const flights = await flight.find();
        response.json(flights);
    }catch(error){
        response.status(404).json({message:error.message});
    }
});

router.post('/updateflight',async(request,response)=>{
    const{flightNumber, airline, origin, destination, departureTime, arrivalTime, price, totalSeats, seatsAvailable} = request.body;
    const flightt = new flight({flightNumber, airline, origin, destination, departureTime, arrivalTime, price, totalSeats, seatsAvailable:totalSeats}); 
    try{
        const newFlight = await flightt.save();
        response.status(201).json(newFlight);
    }catch(error){
        response.status(404).json({message:error.message});
    }
});

router.delete('/deleteflight/:id',async(request,response)=>{
    try{
        const flightid = request.params.id;
        const plane = await flight.findById(flightid);
        if(!plane){
            response.status(404).json({message:"Flight is not available"});
        }else{
            await flight.deleteOne({_id:flightid});
            response.status(200).json({message:"Flight deleted successfully"});
        }
    }catch(error){
        console.log(error.message);
        response.status(404).json({message:error.message});
    }
});

export default router;