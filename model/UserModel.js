import mongoose from "mongoose";
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        unique: true,

    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        validate: [validator.isStrongPassword, "Please Enter Strong Password"],
        minLenght: [8, "Password Should have Atleast 8 character"],
    },
    role: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const User = mongoose.model("User", UserSchema)
export default User