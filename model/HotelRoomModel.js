import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    RoomNo: {
        type: String,
        required: true,
    },
    NumberOfBed: {
        type: String,
        required: true,
    },
    Rent: {
        type: Number,
        required: true,
    },
    RoomType: {
        type: Number,
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
    }


})

const Room = mongoose.model("Rooms", RoomSchema)
export default Room