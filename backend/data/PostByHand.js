const http = require("http");

const data = JSON.stringify({
    CRN: "crn",
    Subj: "subject",
    Crse: "course",
    Sec: "002",
    Cred: "4",
    Title: "some title",
    Classes: [
        {
            type: "Lecture",
            days: "days",
            hours: "hours",
            room: "room",
            instr: "inst",
        },
        {
            type: "Lecture",
            days: "days",
            hours: "hours",
            room: "room",
            instr: "inst",
        },
    ],
});

const options = {
    hostname: "project-api.494910.xyz",
    port: 443,
    path: "/api/classes/upload",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
    },
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", d => {
        process.stdout.write(d);
    });
});

req.on("error", error => {
    console.error(error);
});

req.write(data);
req.end();
