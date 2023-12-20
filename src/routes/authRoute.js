import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import roleGuard from "../middlewares/roleGuard.js";

const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/refresh", refresh);
authRoute.post("/logout", roleGuard("user"), logout);

export default authRoute;
