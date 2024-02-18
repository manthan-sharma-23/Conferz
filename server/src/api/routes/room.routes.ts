import { Router } from "express";
import { authUser } from "../middleware/auth";
import { createRoom } from "../controller/room-controller/room.create";

const router: Router = Router();

router.post("/create", authUser, createRoom);

export default router;
