import { app } from "./app";
import { db, connectDB } from "./db";

connectDB();

// connect
db.once("open", () => {
    console.log("DB connected!");

    app.listen(app.settings.port, () => {
        console.log("Server ready on ", app.settings.port);
    });
});
