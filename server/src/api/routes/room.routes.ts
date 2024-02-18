import { Router } from "express";
import { authUser } from "../middleware/auth";
import { createRoom } from "../controller/room-controller/room.create";
import { getRooms } from "../controller/room-user-controller/user.rooms.get";
import { joinRoom } from "../controller/room-controller/room.join";
import { getRoomById } from "../controller/room-controller/room.get";

const router: Router = Router();

router
  .post("/create", authUser, createRoom)
  .post("/join", authUser, joinRoom)
  .get("/user", authUser, getRooms)
  .get("/room/:roomId", authUser, getRoomById);

export default router;
