import express from "express";
import adminController from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.post("/fileupload", adminController.fileupload);
adminRouter.delete("/deletefile", adminController.deletefile);
adminRouter.get("/listfiles", adminController.listfiles);
adminRouter.get("/terms", adminController.getTerms);

export default adminRouter;
