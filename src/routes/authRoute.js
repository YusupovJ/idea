import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import authGuard from "../middlewares/authGuard.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", authGuard, logout);

export default authRouter;
