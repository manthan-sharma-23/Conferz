import { WebSocket, WebSocketServer } from "ws";
import { Server } from "http";
import { CALL, MESSAGE, USER } from "../../utils/types";
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
          this._sendMessagesToRoom({
            socketId,
            user: message.payload.user,
            text: message.payload.text,
            room: message.payload.room,
            sendAt: message.sendAt,
          });
        }

        if (message.type === "P2P" && message.payload.call) {
          this._handleP2P({
            socketId,
            room: message.payload.room,
            call: message.payload.call,
          });
        }
      });

      socket.on("close", () => {
        const room = this._users.get(socketId)?.room;
        const user = this._users.get(socketId)?.user;
        if (room && user) {
          const leave: MESSAGE = {
            type: "BROADCAST",
            payload: {
              text: `${user?.name} left`,
            },
            sendAt: new Date(),
          };
          this._broadCastMessageToRoom({ object: leave, room });

          this._users.delete(socketId);
          const users = GetUsers({ users: this._users, room });

          const render: MESSAGE = {
            type: "RENDER",
            payload: {
              users,
            },
            sendAt: new Date(),
          };

          this._broadCastMessageToRoom({ object: render, room });
        }
      });
    });
  }

  private _handleP2P({
    room,
    socketId,
    call,
  }: {
    room?: string;
    socketId: number;
    call: CALL;
  }) {
    if (call.type === "outgoing") {
      const incommingCall: MESSAGE = {
        type: "P2P",
        payload: {
          room: room || call.room,
          call: { ...call, type: "incomming" },
        },
        sendAt: new Date(),
      };

      this._users.forEach((user, UserSocketId) => {
        if (user.room === room && UserSocketId !== socketId) {
          user.socket.send(JSON.stringify(incommingCall));
        }
      });
    } else if (call.type === "answer") {
      const acceptCall: MESSAGE = {
        type: "P2P",
        payload: {
          room: call.room,
          call: { ...call, type: "answer" },
        },
        sendAt: new Date(),
      };
      this._users.forEach((user, UserSocketId) => {
        if (user.room === room && UserSocketId !== socketId) {
          user.socket.send(JSON.stringify(acceptCall));
        }
      });
    }
  }

  private _sendMessagesToRoom({
    room,
    user,
    text,
    sendAt,
  }: {
    text: string;
    room: string;
    user: USER;
    socketId: number;
    sendAt: Date;
  }) {
    const groupMessage: MESSAGE = {
      type: "MESSAGE",
      payload: {
        text,
        user,
      },
      sendAt,
    };

    this._broadCastMessageToRoom({ object: groupMessage, room });
  }

  private _broadCastMessageToRoom({
    room,
    object,
  }: {
    room: string;
    object: any;
  }) {
    this._users.forEach((user) => {
      if (user.room === room) {
        user.socket.send(JSON.stringify(object));
      }
    });
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
        text: `${user.name} joined`,
      },
      sendAt,
    };
    this._broadCastMessageToRoom({ object: broadCast, room });

    this._users.set(socketId, { room, socket, user });

    const users = GetUsers({ users: this._users, room });

    const render: MESSAGE = {
      type: "RENDER",
      payload: {
        users,
      },
      sendAt: new Date(),
    };

    this._broadCastMessageToRoom({ object: render, room });

    const welcomeBroadCast: MESSAGE = {
      type: "INFO",
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
