import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { INPUT_LOGIN_FORM, OUTPUT_LOGIN_FORM } from "../../../utils/types";
import {
  DONT_EXISTS,
  INTERNAL_SERVER_ERROR,
  INVALID_INPUTS,
} from "../../../utils/config/log";
import { db } from "../../../utils/config/db";
import { SECRET_KEY } from "../../../utils/config";
import { USER_LOGGED_IN_SUCCESSFULLY } from "../../../utils/config/log";

export default async function LoginUser(req: Request, res: Response) {
  try {
    console.log("no cors");
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password)
      return res.status(INVALID_INPUTS.code).json(INVALID_INPUTS.action);

    let user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return res.status(DONT_EXISTS.code).json(DONT_EXISTS.action);

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    const output: OUTPUT_LOGIN_FORM = {
      ...USER_LOGGED_IN_SUCCESSFULLY.action,
      token,
    };

    return res.status(USER_LOGGED_IN_SUCCESSFULLY.code).json(output);
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
}
