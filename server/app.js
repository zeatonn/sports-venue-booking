import { config } from "dotenv";
import { dbSetup } from "./config/db.js";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { mainRouter } from "./routes/main.js";

// setup enviornment variables
config();

// establish connection with database
dbSetup();

async function main() {
    const app = express();
    const port = process.env.PORT ?? 8080;

    // setup json body parsing
    app.use(bodyParser.json())

    // setup logging
    app.use(morgan('tiny'));

    // handle app routes
    app.use(mainRouter);

    app.listen(port, ()=>{
        console.log(`Listening to requests on port ${port}!`);
    })
}

main()