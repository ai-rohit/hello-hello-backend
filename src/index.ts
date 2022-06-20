import "dotenv/config";
import initializeServer from "./server";
import { TEXT } from "@constants";
import { Server } from "socket.io";
import { createServer } from "http";
import { verifyJwt } from "./helpers/token.helper";
import { User, Room, Message } from "@models";
import { IRoom, ISocket, IUser } from "@interfaces";

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

  io.on("connection", async (socket: ISocket) => {
    // console.log(socket.user);
    const userId = socket?.user?._id.toString();
    if (!connectedUsers.has(userId)) {
      connectedUsers.set(userId, []);
    }
    connectedUsers.get(userId).push({
      socket,
      socketId: socket.id,
    });

    console.log(connectedUsers);
    const userRooms = await Room.find<IRoom>({
      participants: userId,
    });

    const roomIds: Array<string> = userRooms.map((room) => room.id.toString());

    socket.join(roomIds);
    console.log("rooms", io.sockets.adapter.rooms);

    socket.on("new-msg", async (data: any) => {
      try {
        const { message, messageType, receiver, roomId } = data;
        const sender = userId;
        // console.log(data);
        if (roomId) {
          const newMessage = new Message({
            message,
            messageType,
            sender,
            roomId,
          });
          await newMessage.save();
          socket.to(roomId).emit("incoming-msg", newMessage);
        } else {
          const currentRoom = userRooms.filter((room) => {
            console.log(room.participants.includes(receiver));
            if (room.roomType === 0 && room.participants.includes(receiver)) {
              return room;
            }
          });
          if (currentRoom.length == 0) {
            const room = new Room({
              name: `${receiver}-${sender}`,
              participants: [sender, receiver],
            });
            await room.save();
            socket.join(room._id.toString());

            const receiverSockets = connectedUsers.get(receiver.toString());
            if (receiverSockets.length !== 0) {
              for (let i = 0; i < receiverSockets.length; i++) {
                receiverSockets[i].socket.join(room._id.toString());
              }
            }

            const newMessage = new Message({
              message,
              messageType,
              sender,
              roomId: room._id,
            });
            await newMessage.save();
            io.to(room._id.toString()).emit("new-incoming-msg", newMessage);
            // console.log("new rooms", io.sockets.adapter.rooms);
          } else {
            console.log("abc");
          }
        }
      } catch (err) {
        console.log(err);
        socket.emit("error", { detail: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      const userConnections = connectedUsers.get(userId);
      connectedUsers.set(
        userId,
        userConnections.filter((item: any) => item.socketId != socket.id)
      );
      // console.log(connectedUsers);
    });
  });

  const port: number = parseInt(<string>process.env.PORT) || 3000;

  server.listen(port, () => {
    console.log(`${TEXT.SERVER_STATUS}${port}`);
  });
};

startServer();
