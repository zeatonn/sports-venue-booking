import { db } from "../config/db.js";

// defining the common selection fields to be sent to client whenever requesting multiple centers
const CenterSemiSelectObj = {
    id: true,
    name: true,
    desc: true,
    location: true,
    createdAt: true,
    updatedAt: true,

    _count: {
        select: {
            sports: true
        }
    }
}

// defining the common selection fields to be sent to client whenever requesting individual center
const CenterFullSelectObj = {
    id: true,
    name: true,
    desc: true,
    location: true,
    createdAt: true,
    updatedAt: true,

    sports: {
        select: {
            id: true,
            sport: {
                select: {
                    id: true,
                    name: true,
                }
            },
            courts: {
                select: {
                    id: true,
                    name: true,
                    desc: true,
                }
            }
        }
    }
};

// create a new center
export async function createCenter(centerObj) {
    const newCenter = await db.center.create({
        data: centerObj,
        select: {
            id: true,
        }
    });

    return newCenter.id
};

// get list of all centers that exist
export async function getAllCenters() {
    const allCenters = await db.center.findMany({
        select: CenterSemiSelectObj
    });

    return allCenters;
}

// get all the data of the center whose id is provided
export async function getCenter(centerId) {
    const center = await db.center.findUnique({
        where: {
            id: centerId
        },
        select: CenterFullSelectObj
    });

    return center;
};

// delete the center whose id is provided
export async function deleteCenter(centerId) {
    await db.center.delete({
        where: {
            id: centerId
        }
    });

    return true;
}

/*  - check if the sport center pair already exists or not, throw error if exist
    - create the sport center pair
*/ 
export async function addSport(centerId, sportId) {
    const alreadyExists = await db.sportCenter.count({
        where: {
            centerId,
            sportId
        }
    });

    if(alreadyExists > 0) {
        throw new Error('Sport already exists in the center!')
    }

    const newSportCenter = await db.sportCenter.create({
        data: {
            sportId,
            centerId
        },
        select: {
            id: true
        }
    });

    return newSportCenter.id;
}

// delete the sport center pair whose id is provided
export async function removeSport(sportCenterId) {
    await db.sportCenter.delete({
        where: {
            id: sportCenterId
        }
    });

    return true;
}