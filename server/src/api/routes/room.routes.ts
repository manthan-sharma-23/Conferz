import { Router } from "express";
import { authUser } from "../middleware/auth";
import { createRoom } from "../controller/room-controller/room.create";
import { getRooms } from "../controller/room-user-controller/user.rooms.get";
import { joinRoom } from "../controller/room-controller/room.join";

const router: Router = Router();

router.post("/create", authUser, createRoom);
router.post("/join", authUser, joinRoom);
router.get("/user", authUser, getRooms);

export default router;
