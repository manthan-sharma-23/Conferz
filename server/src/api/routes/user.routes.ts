import { Router } from "express";
import LoginUser from "../controller/user-controller/user.login";
import RegisterUser from "../controller/user-controller/user.register";
import getUser from "../controller/user-controller/user.get";
import { authUser } from "../middleware/auth";

const router: Router = Router();

router
  .post("/register", RegisterUser)
  .post("/login", LoginUser)
  .get("/", authUser, getUser);

export default router;
