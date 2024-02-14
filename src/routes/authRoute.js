import { Router } from "express";
import { login, logout, me, refresh, register } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidator.js";
import authGuard from "../middlewares/authGuard.js";

const authRoute = Router();

authRoute.post("/register", ...registerValidator, register);
authRoute.post("/login", ...loginValidator, login);
authRoute.get("/refresh", refresh);
authRoute.post("/logout", authGuard, logout);
authRoute.get("/me", authGuard, me);

export default authRoute;
