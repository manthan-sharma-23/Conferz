import express from "express";
import http from "http";
import SocketService from "./services/socket/socket";
import AppRouter from "./api";


const PORT = 3200;

const app = express();
app.use("/api", AppRouter);

const server = http.createServer(app);

const wss = new SocketService(server);
wss.SocketListenner();

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
