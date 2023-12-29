import { getAll, remove, update } from "../controllers/userController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { getAllUserValidator, updateUserValidator } from "../validators/userValidator.js";

const userRoute = Router();

userRoute.get("/", ...roleGuard("moderator"), ...getAllUserValidator, getAll);
userRoute.patch("/:id", ...roleGuard("moderator", "user"), ...updateUserValidator, update);
userRoute.delete("/:id", ...roleGuard("moderator", "user"), remove);

export default userRoute;
