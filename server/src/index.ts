import bodyParser from "body-parser";
import express from "express";
import http from "http";
import SocketService from "./socket/socket";
import cors from "cors";

const PORT = 3200;

const app = express();
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors());

const server = http.createServer(app);

const wss = new SocketService(server);
wss.SocketListenner();

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
