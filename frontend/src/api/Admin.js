import { URL } from "./config";

export const uploadfile = async (file, termname) => {
    try {
        if (!file) {
            throw new Error("Please, select a file");
        }
        if (!termname) {
            throw new Error("Please, insert a term name");
        }
        const data = new FormData();
        data.append("file", file);
        data.append("termname", termname);

        // console.log(file);
        const res = await window.fetch(`${URL}/api/admin/fileupload`, {
            method: "POST",
            body: data,
        });

        if (res.ok) {
            const uploadedFile = await res.json();
            return uploadedFile;
        } else {
            throw new Error("Error uploading file");
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getFileList = async () => {
    try {
        const fileListRequest = await window.fetch(`${URL}/api/admin/listfiles`, {
            method: "GET",
        });

        if (fileListRequest.ok) {
            const fileList = await fileListRequest.json();
            return fileList;
        } else {
            throw new Error("Error getting list of files");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getTermList = async () => {
    try {
        const termListRequest = await window.fetch(`${URL}/api/admin/terms`, {
            method: "GET",
        });

        if (termListRequest.ok) {
            const termList = await termListRequest.json();
            return termList;
        } else {
            throw new Error("Error getting term list");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const removeFile = async filename => {
    try {
        if (!filename) {
            throw new Error("Please, give a file to be removed");
        }
        const deleteFileRequest = await window.fetch(
            `${URL}/api/admin/deletefile?file=${filename}`,
            {
                method: "DELETE",
            }
        );

        if (deleteFileRequest.ok) {
            return;
        } else {
            throw new Error("Error deleting file");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Upload a file and update a progress bar using setProgress
 * setProgress is a react hook to update the state of the
 * progress bar component
 *
 * @param {*} file
 * @param {*} termname
 * @param {*} setProgress (optional)
 */
export const uploadFileWithProgress = (file, termname, setProgress, dispatch) =>
    new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        if (file === null) reject(new Error("Invalid file"));

        if (termname === "" || termname === null) reject(new Error("Invalid term name"));

        req.upload.addEventListener("progress", event => {
            if (event.lengthComputable && setProgress) {
                dispatch
                    ? dispatch(setProgress((event.loaded / event.total) * 100))
                    : setProgress((event.loaded / event.total) * 100);
            }
        });

        req.upload.addEventListener("load", event => {
            if (setProgress) setProgress(100);
            // resolve(JSON.parse(req.response));
            console.log("end of upload");
        });

        req.upload.addEventListener("error", event => {
            if (setProgress) setProgress(0);
            console.log("some error uploading the file!!!!!!");
            console.log(event);
            reject(JSON.parse(req.response));
        });

        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (setProgress) setProgress(0);
                resolve(JSON.parse(req.response));
            }
        };

        const data = new FormData();
        data.append("file", file);
        data.append("termname", termname);

        req.open("POST", `${URL}/api/admin/fileupload`);
        req.send(data);
    });
