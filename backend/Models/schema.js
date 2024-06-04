import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
   flightNumber:{
       type:String,
       required:true,
   },
    two_way:{
        type:String,
        enum:['Yes','No'],
        required:true,
    },
    Number_of_tickets:{
        type:Number,
        required:true,
    },
    Departure_date:{
        type:Date,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    bookingDate:{
        type:Date,
        default:Date.now,
    },
    baggage:{
        type:String,
        required:true,
    }
});

export const ticket = mongoose.model('ticket',ticketSchema);