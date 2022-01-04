import express, { Application } from "express";
import auth from "./routes/auth";
// import auth from "./routes/auth";

const app: Application = express();

app.use("/", auth);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})