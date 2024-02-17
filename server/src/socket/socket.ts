import { WebSocket, WebSocketServer } from "ws";
import { Server } from "http";

interface MessageType {
  type: "JOIN" | "INFO" | "MESSAGE";
  payload: {
    room?: string;
    text?: string;
  };
}

export default class SocketService {
  private _wss: WebSocketServer;
  private _counter = 0;
  private _users = new Map<number, { room: string; socket: WebSocket }>();

  constructor(server: Server) {
    this._wss = new WebSocketServer({ server });
  }

  SocketListenner() {
    this._wss.on("connection", (socket) => {
      const socketId = this._counter++;
      socket.on("message", (msg) => {
        const message: MessageType = JSON.parse(msg.toString());

        if (message.type === "JOIN" && message.payload.room) {
          this._joinRoom(socket, socketId, message.payload.room);
        }

        if (
          message.type === "MESSAGE" &&
          message.payload.room &&
          message.payload.text
        ) {
          this._sendMessageToRoom(
            socket,
            socketId,
            message.payload.room,
            message.payload.text
          );
        }
      });
      socket.on("close", () => {
        this._users.delete(socketId);
      });
    });
  }

  private _sendMessageToRoom(
    socket: WebSocket,
    socketId: number,
    room: string,
    text: string
  ) {
    console.log(text);
    if (this._users.get(socketId)?.room === room) {
      const message: MessageType = {
        type: "MESSAGE",
        payload: {
          text,
        },
      };
      this._users.forEach((user) => {
        if (user.room === room) {
          user.socket.send(JSON.stringify(message));
        }
      });
    }
  }

  private _joinRoom(socket: WebSocket, socketId: number, room: string) {
    this._users.set(socketId, { room, socket });

    this._users.forEach((user) => {
      if (user.room === room) {
        user.socket.send(JSON.stringify({ room }));
      }
    });
  }

  get WebSocketClient() {
    return this._wss;
  }
}
