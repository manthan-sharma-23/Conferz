import { db } from "../../../utils/config/db";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/config/log";
import { generateCoolRoomName } from "../../../utils/helper/room.name.generator";
import { ProtectedRequest } from "../../../utils/types/extend";
import { Response } from "express";

export const createRoom = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;
    const { name, type } = req.body;
    let roomName = name;

    if (!id) {
      return res
        .status(INTERNAL_SERVER_ERROR.code)
        .json(INTERNAL_SERVER_ERROR.action);
    }

    if (roomName === null || roomName === undefined) {
      roomName = generateCoolRoomName();
      console.log(generateCoolRoomName());
    }

    const room = await db.room.create({
      data: {
        name: roomName,
        type,
      },
    });

    if (!room.id) return res.sendStatus(RESOURCE_NOT_MODIFIED.code);

    const roomUser = await db.roomUser.create({
      data: {
        userId: id,
        roomId: room.id,
        userType: "host",
      },
    });
    if (!roomUser.id) return res.sendStatus(RESOURCE_NOT_MODIFIED.code);
    return res.status(RESOURCE_CREATED_SUCCESSFULLY.code).json(room);
  } catch (error) {RESOURCE_CREATED_SUCCESSFULLY.action
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
