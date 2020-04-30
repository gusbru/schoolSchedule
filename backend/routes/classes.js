import express from "express";
import classesController from "../controller/classesController.js";

const classesRouter = express.Router();

classesRouter.get("/", classesController.getClasses);

classesRouter.get("/subject", classesController.getSubjects);

classesRouter.get("/subjectbyterm", classesController.getSubjectByTerm);

classesRouter.get("/subjectCourse", classesController.getSubjectCourse);

classesRouter.post("/", classesController.postClasses);

classesRouter.post("/upload", classesController.loadClasses);

classesRouter.post("/generateSchedules", classesController.generateSchedules);

export default classesRouter;
