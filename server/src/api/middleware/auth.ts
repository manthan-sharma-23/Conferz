import { NextFunction, Response } from "express";
import { ProtectedRequest, UserJwtPayload } from "../../utils/types/extend";
import {
  DONT_EXISTS,
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_FOUND,
} from "../../utils/config/log";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../utils/config";

export const authUser = (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(DONT_EXISTS.code).json(DONT_EXISTS.action);

    if (token.startsWith("Bearer ")) token = token.split(" ")[1];

    const payload = jwt.verify(token!, SECRET_KEY) as UserJwtPayload;

    if (!payload.userId)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    req.user = payload.userId;

    next();
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
