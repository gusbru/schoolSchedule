import express from "express";
import classesRouter from "./classes.js";
import userRouter from "./user";
import scheduleRouter from "./schedule";
import adminRouter from "./admin";
import calendarRouter from "./calendar";

const router = express.Router();

router.use("/classes", classesRouter);
router.use("/user", userRouter);
router.use("/schedule", scheduleRouter);
router.use("/admin", adminRouter);
router.use("/calendar", calendarRouter);

export default router;
