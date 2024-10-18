import { db } from "../config/db.js";

export async function createCourt(courtObj) {
  const newCourt = await db.court.create({
    data: courtObj,
    select: {
      id: true,
    },
  });
  return newCourt.id;
}

export async function deleteCourt(courtId) {
  await db.court.delete({
    where: {
      id: courtId,
    },
  });

  return true;
}

// get all courts with the  provided sportCenterId and
// the bookings in them on the provided date
export async function getAllBookings(sportCenterId, date) {
  const allCourtwiseBookings = await db.court.findMany({
    where: {
      sportCenterId: sportCenterId,
    },
    select: {
      id: true,
      name: true,
      desc: true,
      bookings: {
        where: {
          startTime: {
            gte: new Date(date.setHours(0, 0, 0, 0)), // Start of the day
            lt: new Date(date.setHours(24, 0, 0, 0)), // Start of the next day
          },
        },
        select: {
          id: true,
          startTime: true,
          endTime: true,
          createdAt: true,
          comments: true,
          isWaitlisted: true,
          isCancelled: true,
        },
      },
    },
  });
  return allCourtwiseBookings;
}

export async function createBooking(bookingObj) {
  console.log(bookingObj.startTime);
  bookingObj.startTime = new Date(new Date(bookingObj.startTime));
  const { courtId, startTime } = bookingObj;

  const alreadyExists = await db.booking.count({
    where: {
      courtId: courtId,
      startTime: {
        lte: startTime,
      },
      endTime: {
        gt: startTime,
      },
    },
  });

  if (alreadyExists > 0) {
    // throw new Error('Court already booked for this slot!')
    bookingObj.isWaitlisted = true;
  } else {
    bookingObj.isWaitlisted = false;
  }
  bookingObj.isCancelled = false;

  bookingObj.endTime = new Date(startTime + 60 * 60 * 1000);

  const newBooking = await db.booking.create({
    data: bookingObj,
    select: {
      id: true,
    },
  });
  return newBooking.id;
}

// delete the booking whose id is provided
export async function deleteBooking(bookingId) {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  return true;
}

export async function cancelBooking(bookingId) {
  let booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
    select: {
      courtId: true,
      startTime: true,
    },
  });
  await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      isCancelled: true,
    },
  });

  const nextBookings = await db.booking.findFirst({
    where: {
      courtId: booking.courtId,
      startTime: booking.startTime,
      isCancelled: false,
    },
    select: {
      id: true,
      isWaitlisted: true,
    },
  });

  if (!nextBookings.isWaitlisted) {
    await db.booking.update({
      where: {
        id: nextBookings.id,
      },
      data: {
        isWaitlisted: false,
      },
    });
  }
}
