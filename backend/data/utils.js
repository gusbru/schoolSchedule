import fs from "fs";
import path from "path";

const readFile = filename =>
    new Promise((resolve, reject) => {
        const filePath = path.join(filename);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });

export const readInput = async filename => {
    try {
        const inputFile = await readFile(filename);
        return inputFile;
    } catch (e) {
        console.log(e);
    }
};
