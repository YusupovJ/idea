import userController from "../controllers/userController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { getAllUserValidator, updateUserValidator } from "../validators/userValidator.js";

const userRoute = Router();

userRoute.get("/", ...roleGuard("moderator"), ...getAllUserValidator, userController.getAll);
userRoute.patch("/:id", ...roleGuard("moderator", "user"), ...updateUserValidator, userController.update);
userRoute.delete("/:id", ...roleGuard("moderator", "user"), userController.remove);

export default userRoute;
