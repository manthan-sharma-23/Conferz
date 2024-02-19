import { db } from "../../../utils/config/db";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_INPUTS,
  RESOURCE_CREATED_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/config/log";
import { ProtectedRequest } from "../../../utils/types/extend";
import { Response } from "express";

export const getRoomById = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;
    const { roomId } = req.params;

    if (!id || !roomId) return res.sendStatus(INVALID_INPUTS.code);

    const room = await db.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        name: true,
        createdAt: true,
        createdBy: true,
        type: true,
      },
    });

    if (!room)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    return res.status(RESOURCE_CREATED_SUCCESSFULLY.code).json(room);
  } catch (error) {
    RESOURCE_CREATED_SUCCESSFULLY.action;
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
