import "dotenv/config";
import initializeServer from "./server";
import { TEXT } from "@constants";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

const startServer = async (): Promise<any> => {
  const app = initializeServer();

  const server = createServer(app);
  const io = new Server(server);
  io.on("connection",(socket: Socket)=>{
    console.log("socket", socket)
  })
  const port: number = parseInt(<string>process.env.PORT) || 3000;

  server.listen(port, () => {
    console.log(`${TEXT.SERVER_STATUS}${port}`);
  });
};

startServer();
