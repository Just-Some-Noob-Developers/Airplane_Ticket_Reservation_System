import express from "express";
import { flight } from "../Models/flight.js";
import { ticket } from "../Models/schema.js";

const route = express.Router();

route.get('/bookedTickets',async(request,response)=>{
    try{
        const booking = await ticket.find();
        response.json(booking);
    }
    catch(error){
        response.status(500).json({message:error.message});
    }
});

route.post('/bookTickets',async(request,response)=>{
    const {flightNumber,name,email,number_of_tickets} = request.body;
    try{
        const flightDetails = await flight.findOne({flightNumber});
        if(!flightDetails){
            return response.status(400).json({message:"Flight not found"});
        }
        if(flightDetails.seatsAvailable<number_of_tickets){
            return response.status(400).json({message:"Seats are not available now."});
        }
        const price = flightDetails.price * number_of_tickets;

        const book = new ticket({flightNumber,name,email,number_of_tickets});

        const newBooking = await book.save();

        flightDetails.seatsAvailable -= number_of_tickets;
        await flightDetails.save();
        response.status(201).json(newBooking);
    }catch(error){
        response.status(400).json({message:error.message});
    }
})

export default route;