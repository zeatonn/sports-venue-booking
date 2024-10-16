import mongoose from "mongoose";

export function dbSetup(){
    if(!process.env.MONGO_DB_URL) {
        throw new Error("Mongo DB URL is not provided");
    }
    console.log('Establishing connection with database...');
    
    mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
        console.log('Connected to DB!');
    }).catch((err)=>{
        console.error("Unable to connect to DB!");
    })
}