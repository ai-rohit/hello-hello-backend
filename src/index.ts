import "dotenv/config";
import createServer from "./server";

const startServer = async (): Promise<any> => {
  const app = createServer();

  const port: number = parseInt(<string>process.env["PORT"]) || 3000;

  (await app).listen(port, () => {
    console.log(`🚀 auth service running on port http://localhost:${port}`);
  });
};

startServer();
