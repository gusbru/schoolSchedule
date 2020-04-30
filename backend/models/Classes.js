import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DaySchema = new Schema({
    type: { type: String, required: false },
    days: { type: String, required: false },
    hours: { type: String, required: false },
    room: { type: String, required: false },
    instr: { type: String, required: false },
});

const ClassesSchema = new Schema({
    Term: { type: String, required: true },
    CRN: { type: String, required: true },
    Subj: { type: String, required: false },
    Crse: { type: String, required: false },
    Sec: { type: String, required: false },
    Cred: { type: String, required: false },
    Title: { type: String, required: false },
    Classes: [DaySchema],
});

const Classes = mongoose.model("Classes", ClassesSchema);

export default Classes;
