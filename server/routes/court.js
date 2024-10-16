import e from "express";
import { createBooking, createCourt, deleteBooking, deleteCourt, getAllBookings } from "../controllers/Court.js";
import { response_200 , response_201 } from "../utils/responseCodes.js";

export const courtRouter =e.Router();

courtRouter.post('/new', async (req,res)=>{
    const body = req.body;
    const newCourtId = await createCourt(body);

    return response_201(res, 'Court Created', {
        id: newCourtId
    });
});

courtRouter.post('/add-booking', async (req,res)=>{
    const body = req.body;
    const newBookingId = await createBooking(body);

    return response_201(res, 'Slot booked!', {
        id: newBookingId
    });
});

courtRouter.get('/all/:sportcenterid/:date', async(req,res)=>{
    const {sportcenterid, date} = req.params;
    const allCourts=await getAllBookings(sportcenterid,date);
    return response_200(res, 'List of all courts with their bookings', allCourts);
})

courtRouter.delete('/remove-booking/:bookingid', async (req,res)=>{
    const bookingId= req.params.bookingid;
    await deleteBooking(bookingId);
    return response_200(res, 'Slot has been removed!');
})

courtRouter.delete('/:courtid', async (req,res)=>{
    const courtId= req.params.courtid;
    await deleteCourt(courtId);
    return response_200(res, 'Court has been removed!');
})
