import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";

/**
 * Create server config.
 */
const createServer = (): Express => {
  const app: Express = express();

  app.use(cors());

  app.use(express.json());

  app.use(routes);

  return app;
};

export default createServer;
