import e from "express";
import { sportRouter } from "./sport.js";
import { centerRouter } from "./center.js";
import { courtRouter } from "./court.js";

export const mainRouter = e.Router();

mainRouter.use('/sport', sportRouter)
mainRouter.use('/center', centerRouter)
mainRouter.use('/court',courtRouter)