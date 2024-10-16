import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

export function dbSetup(){
    if(!process.env.DATABASE_URL) {
        throw new Error("DB URL is not provided");
    }
    console.log('Establishing connection with database...');
    
    db.$connect().then(()=>{
        console.log('Connected to DB!');
    }).catch((err)=>{
        console.error("Unable to connect to DB!");
    })
}
