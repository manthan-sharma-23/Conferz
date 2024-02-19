import express, { Request, Response } from "express";
import http from "http";
import SocketService from "./services/socket/socket";
import AppRouter from "./api";
import { SERVER_PORT } from "./utils/config";

const PORT = SERVER_PORT;

const app = express();
app.use("/api", AppRouter);

app.use("/", (req: Request, res: Response) => {
  return res.send("Hey");
});
const server = http.createServer(app);

const wss = new SocketService(server);
wss.SocketListenner();

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
