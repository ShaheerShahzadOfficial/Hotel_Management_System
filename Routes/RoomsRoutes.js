import express from "express"
const RoomRoutes = express.Router()
import {
    NewRoom,
    getAllRooms,
    UpdateRoom,
    DeleteRoom,
    UpdateRoomStatus
} from "../controller/RoomsController.js"

import {checkToken} from "../middleWare/Auth.js"

RoomRoutes.route("/AddRoom").post(checkToken,NewRoom)
RoomRoutes.route("/AllRooms").get(checkToken,getAllRooms)
RoomRoutes.route("/UpdateRoom").put(checkToken,UpdateRoom)
RoomRoutes.route("/DeleteRoom").delete(checkToken,DeleteRoom)
RoomRoutes.route("/UpdateRoom").put(checkToken,UpdateRoomStatus)






export default RoomRoutes