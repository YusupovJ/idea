import { getAll, remove, update } from "../controllers/userController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { getAllUserValidator, updateUserValidator } from "../validators/userValidator.js";
import { isId } from "../validators/customValidators.js";

const userRoute = Router();

userRoute.get("/", ...roleGuard("admin"), ...getAllUserValidator, getAll);
userRoute.patch("/:id", ...roleGuard("admin", "user"), isId, ...updateUserValidator, update);
userRoute.delete("/:id", ...roleGuard("admin", "user"), isId, remove);

export default userRoute;
