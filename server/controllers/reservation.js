import Reservation from '../models/Reservation.js'
import tryCatch from "./utils/tryCatch.js";

// add the start nd end date 

export const createReservation  = tryCatch(async(req, res) =>{
    const {id:resId, name:rName, photo:rPhoto} = req.user // extracting info from the request 

    const newReservation = Reservation ({...req.body,resId,rName,rPhoto})
    
    await newReservation.save() // save to the database 
    res.status(201).json({success:true, result: newReservation })
});

// when i remove the try catch it comes back as running server side but does not pass the authorization 




// issue here with id or user auth 
