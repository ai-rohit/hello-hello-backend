import "dotenv/config";
import createServer from "./server";
import { TEXT } from "@constants";

const startServer = async (): Promise<any> => {
  const app = createServer();

  const port: number = parseInt(<string>process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`${TEXT.SERVER_STATUS}${port}`);
  });
};

startServer();
