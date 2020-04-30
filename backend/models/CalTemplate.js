import mongoose from "mongoose";

const Schema = mongoose.Schema;


const structureCalSchema = new Schema({
	name:{	type: String, required: true, max: 25 },
	selectedSub:[],
	schedule:[]
})


const CalTemplate = mongoose.model("CalTemplate", structureCalSchema);

exports.structureCalSchema = structureCalSchema;

export default CalTemplate;
