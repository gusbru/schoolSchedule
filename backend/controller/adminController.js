// import multer from "multer";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { getData } from "../data/parse.js";
import Term from "../models/Term";
import Classes from "../models/Classes";
import Subject from "../models/Subject";

/**
 * Remove a file from disk
 * The file parameter is the filepath complete.
 * For example, if the file test.html located at /home/user/data
 * will be removed, file should be /home/user/data/test.html
 *
 * @param {fs.PathLike} file path to file name to be removed.
 * @returns {Promise<>} A promise with the status of unlink a file
 */
function rmFile(file) {
    return new Promise((resolve, reject) => {
        fs.unlink(file, error => {
            if (error) {
                console.log("error deleting file");
                console.log(error);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

const uploadFile = (req, res) =>
    new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
            uploadDir: path.join(__dirname, "../data/html"),
            keepExtensions: true,
        });

        const response = {
            filename: "",
            filepath: "",
            termname: "",
        };

        form.on("file", (field, file) => {
            response.filename = file.name;
            response.filepath = file.path;
            console.log(response);
        });

        form.on("end", () => {
            console.log("upload finished!");
            resolve(response);
        });

        form.on("error", err => {
            console.log("error uploading a file", err);
            reject(err);
        });

        form.on("aborted", err => {
            console.log("file upload aborted");
            reject(err);
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            response.termname = fields.termname;
            req.body = fields;
            console.log("end of parser");
        });
    });

const fileupload = async (req, res, next) => {
    let fileinfo;
    try {
        fileinfo = await uploadFile(req, res); // using formidable

        const newTerm = new Term({
            Termname: fileinfo.termname,
            Filename: fileinfo.filename,
            Filepath: fileinfo.filepath,
        });

        // register the term
        const newTermRes = await newTerm.save();

        // create the subject list
        const subjList = {};

        // populate the classes colletion
        const registers = await getData(fileinfo.filepath);
        const registersPromises = [];
        registers.forEach(register => {
            subjList[register.Subj] = true;
            register.Term = req.body.termname;
            const newReg = new Classes(register);
            registersPromises.push(newReg.save());
        });
        await Promise.all(registersPromises);

        // register all subjects
        const subjPromises = [];
        Object.keys(subjList).forEach(s => {
            const newSubj = new Subject({
                Name: s,
                Code: s,
                Term: req.body.termname,
            });
            subjPromises.push(newSubj.save());
        });
        await Promise.all(subjPromises);

        // all registers inserted into db!
        // can remove the file
        await rmFile(fileinfo.filepath);

        res.send(newTermRes);
    } catch (error) {
        console.log(error);
        // delete inserted items Term
        await Term.deleteMany({ Term: req.body.termname });

        // remove file from disk
        if (fileinfo) {
            try {
                await rmFile(fileinfo.filepath);
            } catch (error) {
                console.log("no file to delete");
            }
        }

        res.status(500).send(error);
    }
};

const deletefile = async (req, res, next) => {
    // const path = __dirname + "/../data/html/";
    const { file } = req.query;
    console.log("file = ", file);

    try {
        // search db for file path
        // const fileInfo = await Term.findOne({ Termname: file });

        // remove file from disk
        // await rmFile(fileInfo.Filepath);

        // remove file from db
        await Term.deleteOne({ Termname: file });

        // remove registers from db
        await Subject.deleteMany({ Term: file });
        await Classes.deleteMany({ Term: file });

        return res.status(200).end();
    } catch (error) {
        console.log(error);
        error.message = "error deleting file";
        error.code = 500;
        next(error);
    }
};

const listfiles = (req, res, next) => {
    const pathName = path.join(__dirname, "/../data/html");
    fs.readdir(pathName, (error, items) => {
        if (error) {
            console.log("error getting list of files");
            console.log(error);
            error.message = "error getting list of files";
            error.code = 500;
            next(error);
        } else {
            // filter out only the html elements
            const htmlItems = items.filter(item => item.toLowerCase().includes(".html"));
            return res.json(htmlItems).end();
        }
    });
};

/**
 * Get all terms available in DB
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getTerms = async (req, res, next) => {
    try {
        const termList = await Term.find({});
        res.json(termList);
    } catch (error) {
        console.log("error get terms");
        console.log(error);
        next(error);
    }
};

const userController = {
    fileupload,
    deletefile,
    listfiles,
    getTerms,
};

export default userController;
