import Room from "../model/HotelRoomModel.js"
import cloudinary from "cloudinary"


const NewRoom = async (req,res,next)=>{


let images = [];

if (typeof req.body.Images === "string") {
    images.push(req.body.images);
} else {
    images = req.body.Images;
}

const imagesLinks = [];

for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "HotelManagementRooms",
    });

    imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
    });
}

req.body.Images = imagesLinks;


req.body.Hotel = req.user.id
req.body.HotelName = req.user.name

 await Room.create(req.body).then((result) => {
    res.status(201).json({
        success: true,
        product: result
    })
}).catch((err) => {
    res.status(500).json({
        err: err.message
    })
});


}


const getAllRooms=async(req,res,next)=>{
    const resultPerPage = 12
    const RoomCount = await Room.countDocuments()
    let { pageNumber } = req.query;


    let skipCount = (pageNumber - 1) * resultPerPage;
    let allRooms = await Room.find().limit(Number(resultPerPage)).skip(skipCount);



    res.status(200).json({
        RoomCount,
        allRooms
    })
}


const getAllRoomsPerManager=async(req,res,next)=>{

   
    let allRooms = await Room.find({Hotel:req.user._id});



    res.status(200).json({
        allRooms
    })
}

const UpdateRoom=async(req,res,next)=>{
   const RoomUpdate =  await Room.findByIdAndUpdate({_id:req.params.id},{
        RoomType,NumberOfBed
    })
    
if(!RoomUpdate){
    return res.status(404).json({
        msg:"Room Not Found"
    })
}

    res.status(200).json({
        success:true
    })

}



const DeleteRoom=async(req,res,next)=>{
    const DeleteRoom =  await Room.findById({_id:req.params.id})
     
 if(!DeleteRoom){
     return res.status(404).json({
         msg:"Room Not Found"
     })
 }
 
 await DeleteRoom.delete()

     res.status(200).json({
         success:true
     })
 
 }



 const UpdateRoomStatus=async(req,res,next)=>{
     const UpdateRoom = await Room.findByIdAndUpdate({_id:req.params.id},{Availablity})
     
 if(!UpdateRoom){
     return res.status(404).json({
         msg:"Room Not Found"
     })
 }
 
 

     res.status(200).json({
         success:true
     })
 
 }

export {
    NewRoom,
    getAllRooms,
    UpdateRoom,
    DeleteRoom,
    UpdateRoomStatus,
    getAllRoomsPerManager
}