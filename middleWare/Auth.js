import jsonwebtoken from "jsonwebtoken"


function checkToken(req, res, next) {
    //get authcookie from request
    const { authToken } = req.cookies

    if (!authToken) {
        return res.status(401).json({
            Message: "Please Login To Continue"
        })
    }

    //verify token which is in cookie value
    const decoded = jsonwebtoken.verify(authToken, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            res.status(403).json({
                Message: "You Are Not Authenticated"
            }
            )
            console.log(err)

        }
        else if (decoded) {
            console.log(decoded)
            req.user = decoded
            console.log(decoded)
            next()
        }
    }
    )
}



const AuthenticatedUserRole = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allow to access this Resource`, 403))
        }

        next()
    }

}






export {
    AuthenticatedUserRole,
    checkToken
}