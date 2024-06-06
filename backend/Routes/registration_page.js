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
    const {flightNumber,number_of_tickets,passengers} = request.body;
    try{
        const flightDetails = await flight.findOne({flightNumber});
        if(!flightDetails){
            return response.status(400).json({message:"Flight not found"});
        }
        if(flightDetails.seatsAvailable<number_of_tickets){
            return response.status(400).json({message:"Seats are not available now."});
        }
        const price = flightDetails.price * number_of_tickets;

        const book = new ticket({flightNumber,number_of_tickets,passengers});

        const newBooking = await book.save();

        flightDetails.seatsAvailable -= number_of_tickets;
        await flightDetails.save();
        response.status(201).json(newBooking);
    }catch(error){
        response.status(400).json({message:error.message});
    }
});

route.put('/updateTicket/:id',async(request,response)=>{
    const {id} = request.params; 
    const {flightNumber, number_of_tickets, passengers} = request.body;
    try{
        const boardingpass = await ticket.findById(id);
        if(!boardingpass){
            return response.status(404).json({message:"Ticket not found"});
        }
        const flightDetails = await flight.findOne({flightNumber});
        if(!flightDetails){
            response.status(400).json({message:"Flight not found"});
        }
        const extraSeats = passengers.length - boardingpass.passengers.length;
        if(extraSeats>flightDetails.seatsAvailable){
            response.status(400).json({message:"Seats are not currently available."});
        }
        boardingpass.flightNumber = flightNumber;
        boardingpass.number_of_tickets = number_of_tickets;
        boardingpass.passengers = passengers;
        

        const updatedBookings = await boardingpass.save();

        flightDetails.seatsAvailable -= extraSeats;
        await flightDetails.save();
        response.json(updatedBookings);
    }catch(error){
        response.status(400).json({message:error.message});
    }
});

route.delete('/deleteTicket/:id',async(request,response)=>{
    try{
        const userid = request.params.id;
        const user = await ticket.findById(userid);
        if(!user){
            response.status(404).json({message:"Ticket not found"});
        }else{
            await ticket.deleteOne({_id:userid});
            response.status(200).json({message:"Tickets deleted Successfully"});
        }
    }catch(error){
        console.log(error.message);
        response.status(404).json({message:error.message});
    }
});

export default route;