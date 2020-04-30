import express from "express";
import calendarController from "../controller/calendarController";
import auth from "../middleware/auth";

const calendarRouter = express.Router();

calendarRouter.post("/addcalendar", calendarController.addcalendar);
calendarRouter.get("/getscheduleslist", auth, calendarController.getscheduleslist);
calendarRouter.delete("/deleteschedule", calendarController.deleteschedule);

export default calendarRouter;
