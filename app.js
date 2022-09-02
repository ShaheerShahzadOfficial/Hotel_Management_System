import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import UserRoutes from "./Routes/UserRoutes.js"
import RoomRoutes from "./Routes/RoomsRoutes.js"
import BookingRoute from "./Routes/BookingRoutes.js"
const app = express()

// connecting Modules

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))


// Defining Routes 

app.use("/Room",RoomRoutes)
app.use("/booking",BookingRoute)
app.use("/user",UserRoutes)


// Checking That Api is Hosted or Not
app.get('/', (req, res) => {
    res.send('Hello from Express!',"App Has Been Hosted on Heroku")
})

// Error  🤦‍♂️🤦‍♂️

app.use((req, res) => {
    res.status(404).json({
        Error: "URL Not Found"
    })
})






export default app