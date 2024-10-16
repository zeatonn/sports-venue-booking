import { db } from "../config/db.js";

export async function createCourt(courtObj) {
    const newCourt = await db.court.create({
        data: courtObj,
        select:{
            id:true
        }
    })
    return newCourt.id;
}

export async function deleteCourt(courtId) {
    await db.court.delete({
        where: {
            id: courtId
        }
    });

    return true;
}

// get all courts with the  provided sportCenterId and
// the bookings in them on the provided date
export async function getAllBookings(sportCenterId, date) {
    const allCourtwiseBookings = await db.court.findMany({
        where:{
            sportCenterId: sportCenterId        
        },
        select:{
            id: true,
            name: true,
            desc: true,
            bookings: {
                where: {
                    startTime: {
                        gte: new Date(date.setHours(0, 0, 0, 0)),  // Start of the day
                        lt: new Date(date.setHours(24, 0, 0, 0))   // Start of the next day
                    }
                },
                select: {
                    id: true,
                    startTime: true,
                    createdAt: true,
                    comments: true
                }
            }
        }
    })
    return allCourtwiseBookings;
}

export async function createBooking(bookingObj) {
    bookingObj.startTime = new Date((new Date(bookingObj.startTime)).setMinutes(0, 0, 0));
    const {courtId, startTime} = bookingObj;

    const alreadyExists = await db.booking.count({
        where: {
            courtId: courtId,
            startTime: {
                lte: startTime,
            },
            endTime: {
                gt: startTime
            }
        }
    });

    if(alreadyExists > 0) {
        throw new Error('Court already booked for this slot!')
    }

    bookingObj.endTime = new Date(startTime.setHours(startTime.getHours() + 1, 0, 0, 0));

    const newBooking = await db.booking.create({
        data: bookingObj,
        select:{
            id:true
        }
    })
    return newBooking.id;
}

// delete the booking whose id is provided
export async function deleteBooking(bookingId) {
    await db.booking.delete({
        where: {
            id: bookingId
        }
    });

    return true;
}