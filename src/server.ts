import express, { Express, Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dbConfig } from "@config";
import routes from "@routes";
import { TEXT } from "@constants";
// import { getIp } from "./helpers/ip.helper";

/**
 * Create server config.
 */
//getIp();
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

  app.get("/", (req: Request, res: Response)=>{
    const ip = req.ip;
    console.log(ip);
    console.log(req.socket.remoteAddress);
    res.send(ip);
  })
  app.use("/api/v1", routes);
  app.use("*", async (req: Request, res: Response)=>{
    return res.status(404).json({
      status:"error",
      message:"Invalid API endpoint"
    })
  })
  return app;
};

export default createServer;
