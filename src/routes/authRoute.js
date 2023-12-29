import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { loginValidator, refreshValidator, registerValidator } from "../validators/authValidator.js";

const authRoute = Router();

authRoute.post("/register", ...registerValidator, register);
authRoute.post("/login", ...loginValidator, login);
authRoute.post("/refresh", ...refreshValidator, refresh);
authRoute.post("/logout", roleGuard("user"), logout);

export default authRoute;
