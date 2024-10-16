import { config } from "dotenv";
import { dbSetup } from "./config/db.js";
import express from "express";
import morgan from "morgan";

// setup enviornment variables
config();

// establish connection with database
dbSetup();

function main() {
    const app = express();
    const port = process.env.PORT ?? 8080;

    // setup logging
    app.use(morgan('tiny'));

    app.listen(port, ()=>{
        console.log(`Listening to requests on port ${port}!`);
    })
}

main();