const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    checkIn: { type: Date,  required: true },
    checkOut: { type: Date, required: true },
    maxGuest:{type:Number ,required:true,min:1,max:10,},
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    bookingPrice: { type: Number, required: true },
    createdAt:{type:Date,default:Date.now()},
});

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;