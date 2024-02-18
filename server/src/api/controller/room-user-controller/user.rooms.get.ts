import { db } from "../../../utils/config/db";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/config/log";
import { ProtectedRequest } from "../../../utils/types/extend";
import { Response } from "express";

export const getRooms = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;

    if (!id) {
      return res
        .status(INTERNAL_SERVER_ERROR.code)
        .json(INTERNAL_SERVER_ERROR.action);
    }

    const rooms = await db.roomUser.findMany({
      where: {
        userId: id,
      },
    });

    // if (!roomUser.id) return res.sendStatus(RESOURCE_NOT_MODIFIED.code);
    return res
      .status(RESOURCE_FOUND_SUCCESSFULLY.code)
      .json(rooms);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
