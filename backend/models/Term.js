import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TermSchema = new Schema({
    Termname: { type: String, required: true, unique: true },
    Filename: { type: String, required: true },
    Filepath: { type: String, required: true },
});

const Term = mongoose.model("Term", TermSchema);

export default Term;
