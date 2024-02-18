import { WebSocket, WebSocketServer } from "ws";
import { Server } from "http";
import { MESSAGE, USER } from "../../utils/types";
import { MESSAGE_CHANNEL, REDIS_PORT } from "../../utils/config";

export default class SocketService {
  private _wss: WebSocketServer;
  private _counter = 0;
  private _users = new Map<
    number,
    { room: string; user: USER; socket: WebSocket }
  >();

  constructor(server: Server) {
    this._wss = new WebSocketServer({ server });
  }

  SocketListenner() {
    this._wss.on("connection", (socket) => {
      const socketId = this._counter++;

      socket.on("message", (msg) => {
        const message: MESSAGE = JSON.parse(msg.toString());

        if (
          message.type === "JOIN" &&
          message.payload.room &&
          message.payload.user
        ) {
          this._joinRoom({
            socket,
            socketId,
            room: message.payload.room,
            user: message.payload.user,
            sendAt: message.sendAt,
          });
        }

        if (
          message.type === "MESSAGE" &&
          message.payload.room &&
          message.payload.text &&
          message.payload.user
        ) {
        }

        if (
          message.type === "LEAVE" &&
          message.payload.room &&
          message.payload.user
        ) {
          this._leaveRoom({
            user: message.payload.user,
            room: message.payload.room,
            sendAt: message.sendAt,
            socketId,
          });
        }
      });

      socket.on("close", () => {
        const room = this._users.get(socketId)?.room;
        if (room) {
          this._users.delete(socketId);
          const users = GetUsers({ users: this._users, room });

          const render: MESSAGE = {
            type: "RENDER",
            payload: {
              users,
            },
            sendAt: new Date(),
          };

          this._broadCastMessageToRoom({ socketId, object: render, room });
        }
      });
    });
  }

  private _broadCastMessageToRoom({
    socketId,
    room,
    object,
  }: {
    socketId: number;
    room: string;
    object: any;
  }) {
    this._users.forEach((user) => {
      if (user.room === room) {
        user.socket.send(JSON.stringify(object));
      }
    });
  }

  private _leaveRoom({
    user,
    room,
    socketId,
    sendAt,
  }: {
    room: string;
    user: USER;
    socketId: number;
    sendAt: Date;
  }) {
    const broadCast: MESSAGE = {
      type: "BROADCAST",
      payload: {
        text: `${user.email} left`,
      },
      sendAt,
    };

    this._broadCastMessageToRoom({ room, object: broadCast, socketId });
  }

  private _joinRoom({
    socket,
    socketId,
    room,
    user,
    sendAt,
  }: {
    socket: WebSocket;
    socketId: number;
    room: string;
    user: USER;
    sendAt: Date;
  }) {
    const broadCast: MESSAGE = {
      type: "BROADCAST",
      payload: {
        text: `${user.email} joined`,
      },
      sendAt,
    };
    this._broadCastMessageToRoom({ socketId, object: broadCast, room });

    this._users.set(socketId, { room, socket, user });

    const users = GetUsers({ users: this._users, room });

    const render: MESSAGE = {
      type: "RENDER",
      payload: {
        users,
      },
      sendAt: new Date(),
    };

    this._broadCastMessageToRoom({ socketId, object: render, room });

    const welcomeBroadCast: MESSAGE = {
      type: "BROADCAST",
      payload: {
        text: "Welcome to Room",
      },
      sendAt: new Date(),
    };
    this._users.get(socketId)?.socket.send(JSON.stringify(welcomeBroadCast));
  }

  get WebSocketClient() {
    return this._wss;
  }
}

function GetUsers({
  users,
  room,
}: {
  users: Map<
    number,
    {
      room: string;
      user: USER;
      socket: WebSocket;
    }
  >;
  room: string;
}): USER[] {
  const usersInMap = Array.from(users.values());
  const user: USER[] = usersInMap
    .filter((userEntry) => userEntry.room === room)
    .map((userEntry) => userEntry.user);

  return user;
}
