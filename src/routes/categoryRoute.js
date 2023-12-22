import categoryController from "../controllers/categoryController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";

const categoryRoute = Router();

categoryRoute.post("/", ...roleGuard("moderator"), categoryController.add);
categoryRoute.get("/", categoryController.getAll);
categoryRoute.patch("/:id", ...roleGuard("moderator"), categoryController.update);
categoryRoute.delete("/:id", ...roleGuard("moderator"), categoryController.remove);

export default categoryRoute;
