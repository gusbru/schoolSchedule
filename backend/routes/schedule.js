import express from "express";
import scheduleController from "../controller/scheduleController";
import withAuth from "../middleware/withAuth";

const scheduleRouter = express.Router();

scheduleRouter.get("/", withAuth, scheduleController.getAll);

export default scheduleRouter;
