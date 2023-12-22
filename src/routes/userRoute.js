import userController from "../controllers/userController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";

const userRoute = Router();

userRoute.get("/", ...roleGuard("moderator"), userController.getAll);
userRoute.patch("/:id", ...roleGuard("moderator", "user"), userController.update);
userRoute.delete("/:id", ...roleGuard("moderator", "user"), userController.remove);

export default userRoute;
