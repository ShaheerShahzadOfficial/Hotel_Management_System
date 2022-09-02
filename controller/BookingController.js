import Booking from "../model/BookingModel.js"


const NewBooking = async (req, res, next) => {

    const {RoomBooking,TotalRent} = req.body
    const {id} = req.user


const bookingObj = {
    RoomBooking,
    TotalRent,
    User:id
}


 await Booking.create(bookingObj).then((result) => {
        res.status(201).json({
            success: true,
            booking: result
        })
    }).catch((err)=>{
     res.status(500).json({
        msg:err
     })
    })
}


const DeleteBooking = async (req, res, next) => {

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
        res.status(500).json({
            message: "No Booking Found"
        })
    }


    await booking.remove()

    res.status(200).json({
        success: true
    })

}


const GetAllBooking = async (req, res, next) => {

    const booking = await Booking.find()

    if (!booking) {
        res.status(500).json({
            message: "No Booking Found"
        })
    }

    let totalAmount = 0

    booking.forEach(element => {
        totalAmount += element.TotalRent
    });

    res.status(200).json({
        success: true,
        booking,
        totalAmount
    })

}



export {
    NewBooking,
    DeleteBooking,
    GetAllBooking
}