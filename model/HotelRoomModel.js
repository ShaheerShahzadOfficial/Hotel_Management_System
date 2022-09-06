import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    RoomNo: {
        type: Number,
        required: true,
    },
    NumberOfBed: {
        type: Number,
        required: true,
    },
    Rent: {
        type: Number,
        required: true,
    },
    RoomType: {
        type: String,
        required: true,
    },
    Images: [ 
        {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    } 
],
    Availablity:{
        type: String,
        required: true,
        default:"Available"
    },
    Hotel:{
        type:String,
        required:true
    },
    Description:{
        type: String,
        required: true,
    },
    HotelName:{
        type: String,
        required: true,
    }


})

const Room = mongoose.model("Rooms", RoomSchema)
export default Room