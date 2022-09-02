import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    RoomBooking: [{
        RoomNo: {
            type: String, required: true
        },
        Rent: {
            type: Number, required: true
        },
        Days: {
            type: Number, required: true
        },
        Room: {
            type: mongoose.Schema.ObjectId,
            ref: "Rooms",
            required: true
        }
    }],
    User: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    TotalRent: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        default: "Room Booked",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Booking = mongoose.model("Booking", BookingSchema)
export default Booking