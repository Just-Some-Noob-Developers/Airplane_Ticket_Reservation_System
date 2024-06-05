import mongoose from "mongoose";

const passenger = mongoose.Schema({
     name:{
          type:String,
          required:true,
     },
     email:{
          type:String,
          required:true,
     },
})

const ticketSchema = mongoose.Schema({
   flightNumber:{
       type:String,
       required:true,
   },
   number_of_tickets:{
     type:Number,
     required:true,
   },
   passengers:[
     passenger
   ],
   
});

export const ticket = mongoose.model('ticket',ticketSchema);