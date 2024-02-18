import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types/extend";
import { db } from "../../../utils/config/db";
import { DONT_EXISTS, INTERNAL_SERVER_ERROR } from "../../../utils/config/log";
import { USER_LOGGED_IN_SUCCESSFULLY } from "../../../utils/config/log/index";

const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;

    if (!id) return;

    const user = await db.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) return res.status(DONT_EXISTS.code).json(DONT_EXISTS.action);

    return res.status(USER_LOGGED_IN_SUCCESSFULLY.code).json(user);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getUser;
