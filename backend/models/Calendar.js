import mongoose from "mongoose";

const Schema = mongoose.Schema;
const {structureCalSchema} = require('./CalTemplate');


const calendarSchema = new Schema({
	email:{	type: String, required: true, max: 50, unique: true },
	schedules:[structureCalSchema]
})

// MongoDB documentation suggests it is not possible to create a compound key
// combining a field of one collection with a field of a subdocument which is
// also part of such collection.

// What seems possible is to create a compound key between main fields of a
// collection or to create fields of a subdocument, but not a combination between
// those fields.

// I've created an index trying to impose such a constraint but it did not work.
// I mean, Mongo did create a compound unique-index with fields email and name,
// but it did not work as expected, allowing duplicate entries.
//
// Setting a unique attribute to field <name> of the subdocument collection prevents
// any duplicate entry, but as a whole, I mean, if a user pick a name, no other one
// will be able to use the same name even they are different users, and, because of
// that, have different main entries on the registry.

// calendarSchema.index( { email: 1, name: 1 } , { unique: true }  );


const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;
