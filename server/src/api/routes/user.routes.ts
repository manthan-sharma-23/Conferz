import { Router } from "express";

const router: Router = Router();

router.post("/register", rateLimiter, RegisterUser);
router.post("/login", rateLimiter, LoginUser);
router.get("/", authUser, getUser);
router.get("/all", authUser, getAllUsers);
router.get("/getuser/:userId", authUser, getUserById);

export default router;
