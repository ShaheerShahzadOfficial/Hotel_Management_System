import express from "express"
import {
    NewBooking,
    DeleteBooking,
    GetAllBooking
} from "../controller/BookingController.js"

import {checkToken} from "../middleWare/Auth.js"


const BookingRoute = express.Router()


BookingRoute.route("/NewBooking").post(checkToken,NewBooking)
BookingRoute.route("/AllBooking").get(checkToken,GetAllBooking)
BookingRoute.route("/DeleteBooking").delete(checkToken,DeleteBooking)



export default BookingRoute