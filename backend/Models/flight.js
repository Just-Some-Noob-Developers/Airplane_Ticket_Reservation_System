import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    flightNumber:{
        type:String,
        required:true,
    },
    airline:{
        type:String,
        required:true,
    },
    origin:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    departureTime:{
        type:Date,
        required:true,
    },
    arrivalTime:{
        type:Date,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    totalSeats:{
        type:Number,
        required:true,
    },
    seatsAvailable:{
        type:Number,
        required:true,
    }
});

export const flight = mongoose.model('flight',flightSchema);
