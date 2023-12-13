import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

export default authRouter;
