import { db } from "../../../utils/config/db";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/config/log";
import { generateCoolRoomName } from "../../../utils/helper/room.name.generator";
import { ProtectedRequest } from "../../../utils/types/extend";
import { Response } from "express";

export const joinRoom = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;
    const { roomId } = req.body;

    if (!id || !roomId) {
      return res
        .status(INTERNAL_SERVER_ERROR.code)
        .json(INTERNAL_SERVER_ERROR.action);
    }

    const room = await db.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json({ message: "room not found" });
    }

    await db.roomUser.create({
      data: {
        roomId,
        userId: id,
        userType:"member"
      },
    });

    return res
      .status(RESOURCE_CREATED_SUCCESSFULLY.code)
      .json({ message: "Joined room successfully" });
  } catch (error) {
    RESOURCE_CREATED_SUCCESSFULLY.action;
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
