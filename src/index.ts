import "dotenv/config";
import initializeServer from "./server";
import { TEXT } from "@constants";
import { Server } from "socket.io";
import { createServer } from "http";
import { verifyJwt } from "./helpers/token.helper";
import { User } from "./models/user.model";
import { ISocket, IUser } from "@interfaces";

const startServer = async (): Promise<any> => {
  const app = initializeServer();

  const server = createServer(app);
  const io = new Server(server);

  const connectedUsers = new Map();

  io.use(async function (socket: ISocket, next) {
    try {
      const token: string = socket.handshake.auth.jwt;

      const decoded: any = verifyJwt(token, "access");

      const user = await User.findById<IUser>(decoded.user);

      if (!user) {
        return next(new Error("Failed to authenticate user"));
      } else {
        socket.user = user;
        next();
      }
    } catch (err) {
      return next(new Error("Error authenticating"));
    }
  });

  io.on("connection", (socket: ISocket) => {
    // console.log(connectedUsers);
    // console.log(socket.user);
    const userId = socket?.user?._id;
    if (!connectedUsers.has(userId)) {
      connectedUsers.set(userId, []);
    }
    connectedUsers.get(userId).push(socket.id);

    console.log(connectedUsers.get(userId));

    socket.on("disconnect", () => {
      console.log("disconnected");
      const userConnections = connectedUsers.get(userId);
      connectedUsers.set(
        userId,
        userConnections.filter((item: any) => item != socket.id)
      );
    });
  });

  const port: number = parseInt(<string>process.env.PORT) || 3000;

  server.listen(port, () => {
    console.log(`${TEXT.SERVER_STATUS}${port}`);
  });
};

startServer();
