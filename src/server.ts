import express, { Express } from "express";
import mongoose from "mongoose";
import { dbConfig } from "./config";
import cors from "cors";
import routes from "./routes";

/**
 * Create server config.
 */
const createServer = (): Express => {
  const app: Express = express();

  app.use(cors());

  app.use(express.json());

  mongoose.connect(dbConfig.url, dbConfig.options).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.log(err);
  });


  app.use(routes);

  return app;
};

export default createServer;
