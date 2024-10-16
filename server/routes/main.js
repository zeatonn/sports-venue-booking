import e from "express";
import { sportRouter } from "./sport.js";

export const mainRouter = e.Router();

mainRouter.use('/sport', sportRouter)