import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
   flightNumber:{
       type:String,
       required:true,
   },
   name:{
        type:String,
        required:true,
   },
   email:{
        type:String,
        required:true,
   },
   number_of_tickets:{
        type:Number,
        required:true,
   }
});

export const ticket = mongoose.model('ticket',ticketSchema);