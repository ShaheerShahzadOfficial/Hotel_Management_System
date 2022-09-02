import express from "express"

const UserRoutes = express.Router()

import {
    RegisterUser,
    Login,
    Logout,
    GetUserDetail,
    GetAllUser,
    UpdateProfile,
    UpdateUserRole
} from "../controller/UserController.js"

import { checkToken } from "../middleWare/Auth.js"

UserRoutes.route("/RegisterUser").post(RegisterUser)
UserRoutes.route("/Login").post(Login)
UserRoutes.route("/logout").post(Logout)
UserRoutes.route("/roleUpdate").post(checkToken, UpdateUserRole)
UserRoutes.route("/updateProfile").post(checkToken, UpdateProfile)
UserRoutes.route("/myDetails").get(checkToken, GetUserDetail)
UserRoutes.route("/admin/AllUsers").get(checkToken, GetAllUser)

export default UserRoutes