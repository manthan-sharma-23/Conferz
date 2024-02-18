import { db } from "../../../utils/config/db";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/config/log";
import { ProtectedRequest } from "../../../utils/types/extend";
import { Response } from "express";

export const createRoom = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;
    const { name, type } = req.body;

    if (!id) {
      return res
        .status(INTERNAL_SERVER_ERROR.code)
        .json(INTERNAL_SERVER_ERROR.action);
    }

    const room = await db.room.create({
      data: {
        name,
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
    return res
      .status(RESOURCE_CREATED_SUCCESSFULLY.code)
      .json(RESOURCE_CREATED_SUCCESSFULLY.action);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
