import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../app";
import Term from "../models/Term";

const request = supertest(app);

describe("ADMIN::TERMS", () => {
    const term = new Term({
        Termname: "fileinfo.termname",
        Filename: "fileinfo.filename",
        Filepath: "fileinfo.filepath",
    });

    beforeAll(async () => {
        mongoose.promise = global.Promise;
        const mongoDB = process.env.MONGO_URL;
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await term.save();
    });

    afterAll(async () => {
        await Term.deleteMany();
        await mongoose.connection.close();
    });

    it("get /api/admin/terms", async done => {
        const response = await request.get("/api/admin/terms");

        expect(response.body.length).toBe(1);

        const { _id, Termname, Filename, Filepath } = await response.body[0];
        const expId = term.id;
        const expTermname = term.Termname;
        const expFilename = term.Filename;
        const expFilepath = term.Filepath;

        expect(_id).toBe(expId);
        expect(Termname).toBe(expTermname);
        expect(Filename).toBe(expFilename);
        expect(Filepath).toBe(expFilepath);

        done();
    });
});
