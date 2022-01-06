import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dbConfig } from "./config";
import routes from "./routes";
import { TEXT } from "./constants";

/**
 * Create server config.
 */
const createServer = (): Express => {
  const app: Express = express();

  app.use(cors());

  app.use(express.json());

  mongoose
    .connect(dbConfig.url, dbConfig.options)
    .then(() => {
      console.log(TEXT.DATABASE_STATUS);
    })
    .catch((err) => {
      console.log(err);
    });

  app.use(routes);

  return app;
};

export default createServer;
