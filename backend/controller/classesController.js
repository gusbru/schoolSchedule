import Classes from "../models/Classes.js";
import Subject from "../models/Subject";
import { getData } from "../data/parse.js";
import { comb2arr, createSchedule } from "../data/scheduleUtils";

const getClasses = async (req, res, next) => {
    try {
        const classesList = await Classes.find().sort({
            Subj: "asc",
            Crse: "asc",
        });
        console.log("get classes ", classesList.length);
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.json(classesList);
    } catch (error) {
        console.log("error get classes");
        console.log(error);
        next(error);
    }
};

const getSubjects = async (req, res, next) => {
    try {
        const subjects = await Classes.find({}, "Subj").sort({ Subj: "asc" });
        const subjList = {};
        subjects.forEach(s => {
            subjList[s.Subj] = true;
        });

        res.json(Object.keys(subjList));
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getSubjectByTerm = async (req, res, next) => {
    try {
        const { term } = req.query;
        const subjects = await Subject.find({ Term: term });
        res.json(subjects).end();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const postClasses = async (req, res, next) => {
    try {
        const newClass = new Classes(req.body);
        console.log(req.body);
        await newClass.save();
        res.status(201).send(newClass);
    } catch (error) {
        console.log("error inserting db");
        console.log(error);
        next(error);
    }
};

const loadClasses = async (req, res, next) => {
    try {
        const registers = await getData();
        const registersPromises = [];
        await Classes.deleteMany({});
        registers.forEach(register => {
            const newReg = new Classes(register);
            registersPromises.push(newReg.save());
        });
        await Promise.all(registersPromises);
        res.status(201).send("All registers uploaded");
    } catch (error) {
        console.log("error updating db");
        console.log(error);
        next(error);
    }
};

const getSubjectCourse = async (req, res, next) => {
    try {
        const { subject, term } = req.query;
        const subjects = await Classes.find({ Subj: subject.toUpperCase(), Term: term })
            .sort({ Subj: "asc" })
            .sort({ Crse: "asc" });
        const subjList = {};
        subjects.forEach(s => {
            const key = s.Subj + s.Crse;
            if (subjList[key] === undefined) {
                subjList[key] = {
                    _id: s._id,
                    Subj: s.Subj,
                    Crse: s.Crse,
                    Cred: s.Cred,
                    Title: s.Title,
                };
            }
        });

        const subjCrseList = [];
        Object.keys(subjList).forEach(k => {
            subjCrseList.push(subjList[k]);
        });

        res.json(subjCrseList);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const generateSchedules = async (req, res, next) => {
    try {
        const { subjectList } = req.body;

        const tmp = [];
        for (let i = 0; i < subjectList.length; i++) {
            tmp.push(
                await Classes.find({
                    Subj: subjectList[i].Subj,
                    Crse: subjectList[i].Crse,
                })
            );
        }

        const sel = await Promise.all(tmp);

        // initialize response
        let response = sel.shift();

        // make all combinations
        sel.forEach(s => {
            response = comb2arr(response, s);
        });

        // select only combination with all selections
        const possibleSchedules = [];
        response.forEach(r => {
            if (Array.isArray(r) && r.length === sel.length + 1) {
                possibleSchedules.push(createSchedule(r));
            } else {
                // only one subject selected
                possibleSchedules.push(createSchedule([r]));
            }
        });

        res.json(possibleSchedules);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const classesController = {
    getClasses,
    getSubjects,
    postClasses,
    loadClasses,
    getSubjectCourse,
    generateSchedules,
    getSubjectByTerm,
};

export default classesController;
