import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import roleGuard from "../middlewares/roleGuard.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", roleGuard("user"), logout);

export default authRouter;
