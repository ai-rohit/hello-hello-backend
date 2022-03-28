import express, { Express, Response, Request } from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import { dbConfig } from "@config";
import routes from "@routes";
import { TEXT } from "@constants";

// import { getIp } from "./helpers/ip.helper";

/**
 * Create server config.
 */
//getIp();
const initializeServer = (): Express => {
  const app: Express = express();
  app.use(cors());

  app.use(express.json());
  app.set("views", path.join(__dirname, "views"));
  app.use("/public", express.static("public"));
  mongoose
    .connect(dbConfig.url, dbConfig.options)
    .then(() => {
      console.log(TEXT.DATABASE_STATUS);
    })
    .catch((err) => {
      console.log(err);
    });

  app.get("/", (req: Request, res: Response) => {
    const ip = req.ip;
    console.log(ip);
    console.log(req.socket.remoteAddress);
    res.send(ip);
  });
  app.use("/api/v1", routes);
  app.use("/uploads", express.static("uploads"));
  app.use("*", async (req: Request, res: Response) => {
    return res.status(404).json({
      status: "error",
      message: "Invalid API endpoint",
    });
  });
  return app;
};

export default initializeServer;
