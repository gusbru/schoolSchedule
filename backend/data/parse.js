import { readInput } from "./utils";
import { Parser } from "htmlparser2";

let isReading = false;
let isReading2 = false;
let count = 0;
let string = "";
let numberOfRegisters = 0;
let registers = [];

const parseLine = async line => {
    line = line.split("/");

    if (line[0] === "" || line[2] === "") return;

    // console.log(line);
    // line.forEach((ele, idx) => {
    //   console.log(idx, ele);
    // });
    // return;

    const obj = {};

    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            obj.CRN = line[i];
        } else if (i === 1) {
            obj.Subj = line[i];
        } else if (i === 2) {
            obj.Crse = line[i];
        } else if (i === 3) {
            obj.Sec = line[i];
        } else if (i === 4) {
            obj.Cred = line[i];
        } else if (i === 5) {
            obj.Title = line[i];
        }
    }

    obj.Classes = [];

    // return obj;

    let classes = {};

    let count = 0;
    for (let i = 8; i < line.length - 1; i++) {
        if (count === 7) {
            count = 0;
            if (classes.type !== "") obj.Classes.push(classes);
            classes = {};
        }
        if (count === 0) classes.type = line[i];
        if (count === 1) classes.days = line[i];
        if (count === 2) classes.hours = line[i];
        if (count === 5) classes.room = line[i];
        if (count === 6) classes.instr = line[i];

        count++;
    }
    if (classes.type !== "") obj.Classes.push(classes);

    numberOfRegisters++;

    registers.push(obj);
};

// configure the parser
const parser = new Parser(
    {
        onopentag(name, attribs) {
            if (name === "tr" && attribs.bgcolor !== "#FFFFCC") {
                isReading = true;
            }

            if (name === "td" && !attribs.colspan) {
                isReading2 = true;
            }

            if (name === "em") {
                isReading2 = false;
            }
        },
        ontext(text) {
            text = text.replace(/&nbsp;/g, " ").trim();

            if (isReading) {
            }

            if (isReading && isReading2) {
                count++;

                if (count === 5 && text.length !== 0) {
                    parseLine(string);

                    // start new section
                    // console.log(count, text);
                    string = text + "/";
                } else if (count > 5) {
                    string += text + "/";
                    // console.log(count, text);
                }
            }
        },
        onclosetag(name) {
            if (name === "tr") {
                isReading = false;
                count = 0;
            }

            if (name === "td") {
                isReading2 = false;
            }
        },
    },
    { decodeEntities: false }
);

export const getData = async pathname => {
    try {
        numberOfRegisters = 0;
        registers = [];

        const html = await readInput(pathname);

        parser.write(html);

        parser.end();

        console.log(registers.length);

        console.log("end", numberOfRegisters);

        return registers;
    } catch (error) {
        console.error(error);
    }
};

// getData();
