import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import { loginValidator, refreshValidator, registerValidator } from "../validators/authValidator.js";
import authGuard from "../middlewares/authGuard.js";

const authRoute = Router();

authRoute.post("/register", ...registerValidator, register);
authRoute.post("/login", ...loginValidator, login);
authRoute.post("/refresh", ...refreshValidator, refresh);
authRoute.post("/logout", authGuard, logout);

export default authRoute;
