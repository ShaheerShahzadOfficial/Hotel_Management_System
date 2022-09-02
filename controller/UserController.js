import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import cloudinary from "cloudinary"


// //  😊😊  SignUp Form Started 😘😘


const RegisterUser = async (req, res, next) => {
    let { name, email, password } = req.body


    let public_id;
    let secure_url;
    const file = req.body.avatar

    const myCloud = await cloudinary.v2.uploader.upload(file, {
        folder: "HotelManagementAvatar",
        width: 150,
         crop: "scale",
    })
        .then((result) => {
            console.log(result)
            secure_url = result.secure_url
            public_id = result.public_id
        }).catch((err) => {
            console.log(err, "//////////////")
        });

    const SALT_ROUND = 10
    await bcrypt.hash(password, SALT_ROUND, async (err, hash) => {
        if (err) {
            return (
                res.status(500).json({
                    msg: ` ${err} `
                })
            )
        } else {
            const user = await User.create({
                name, email, password: hash,
                avatar: {
                    public_id: public_id,
                    url: secure_url,
                }
            }).then((result) => {
                res.status(201).json({
                    success: true,
                    email: result.email,
                    name: result.name,
                    avatar: result.avatar,
                    createdAt: result.createdAt,
                    message: "Login Successfull",
                    role: result.role,
                    message: "😲😲😲 Registeration Successful 😲😲😲 "
                })
            }).catch((err) => {
                if (err.name === "MongoServerError") {
                    return res.status(500).json({
                        message: "User All Ready Exist"
                    })
                }
                res.status(500).json({
                    message: err.message
                })
            });
        }
    })
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignUp Form Ended 🙋🏻‍♀️🙋🏻‍♀️

// 😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝😝

// //  😊😊  SignIn Form Started 😘😘

const Login = async (req, res, next) => {
    let { email, password } = req.body

    if (!email || !password) {
        return (
            res.status(400).json({msg : "Please Enter Email && Password !"})
        )
    }


    const userFound = await User.findOne({ email }).select("+password")
        .then(async (user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    const token = jsonwebtoken.sign(
                        {
                            email,
                            name: user.name,
                            role: user.role,
                            id: user._id
                        },
                        process.env.ACCESS_TOKEN,
                        {
                            expiresIn: process.env.EXPIRES_IN
                        }
                    )

                    res.cookie('authToken', token, {
                        expires: new Date(
                            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                        httpOnly: false,
                        maxAge: 120 * 60 * 60 * 1000,
                        secure: true
                    })


                    res.status(200).json({
                        token,
                        email,
                        name: user.name,
                        avatar: user.avatar,
                        createdAt: user.createdAt,
                        message: "Login Successfull",
                        role: user.role,

                    })



                }
                if (!result) {
                    res.status(401).json({
                        msg: "Email or Password not matched",
                    })
                }


            })
        }).catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

// //  🙋🏻‍♀️🙋🏻‍♀️  SignIn Form Ended 🙋🏻‍♀️🙋🏻‍♀️



/////  Logout 

const Logout = async (req, res, next) => {
    res
        .clearCookie("authToken")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}








////// Authenticated User Details

const GetUserDetail = async (req, res, next) => {

    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })

}


// // getAllUser Super Admin 

const GetAllUser = async (req, res, next) => {
    const user = await User.find()

    res.status(200).json({
        success: true,
        user
    })
}





// // Update Profile Authenticated User

const UpdateProfile = async (req, res, next) => {

    let { name, email } = req.body

    const userData = {
        name,
        email,
    }


    const user = await User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });

}




// // // UpdateUserRole Super  Admin Route
const UpdateUserRole = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
};




export {
    RegisterUser,
    Login,
    Logout,
    GetUserDetail,
    GetAllUser,
    UpdateProfile,
    UpdateUserRole
}