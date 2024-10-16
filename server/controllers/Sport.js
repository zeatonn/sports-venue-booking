import { db } from "../config/db.js";

// defining the common selection fields to be sent to client whenever requesting multiple sports
const SportSemiSelectObj = {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    desc: true,
    _count: {
        select: {
            centers: true,
        }
    }
}

// defining the common selection fields to be sent to client whenever requesting individual sport
const SportFullSelectObj = {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    desc: true,
    
    centers: {
        select: {
            center: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    }
};

/*
 * - Create a new sport
 * - return the id of the new sport created
 */
export async function createSport(sportObj) {
    const newSport = await db.sport.create({
        data: sportObj,
        select: {
            id: true
        }
    });

    return newSport.id;
}

// get all sports present in the database
export async function getAllSports(){
    const sports = await db.sport.findMany({
        select: SportSemiSelectObj
    });

    return sports;
}

// get the data of the sport whose id is provided
export async function getSport(sportId) {
    const sport = await db.sport.findUnique({
        where: {
            id: sportId
        },
        select: SportFullSelectObj
    })

    return sport;
}

// delete the sport whose id is provided
export async function deleteSport(sportId) {
    await db.sport.delete({
        where: {
            id: sportId
        }
    });

    return true;
}