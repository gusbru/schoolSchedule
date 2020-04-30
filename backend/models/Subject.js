import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    Name: { type: String, required: true },
    Code: { type: String, required: true },
    Term: { type: String, required: true },
});

const Subject = mongoose.model("Subject", SubjectSchema);

export default Subject;
