import categoryController from "../controllers/categoryController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { addCategoryValidator, getAllCategorysValidator, updateCategoryValidator } from "../validators/categoryValidator.js";

const categoryRoute = Router();

categoryRoute.post("/", ...roleGuard("moderator"), ...addCategoryValidator, categoryController.add);
categoryRoute.get("/", ...getAllCategorysValidator, categoryController.getAll);
categoryRoute.patch("/:id", ...roleGuard("moderator"), ...updateCategoryValidator, categoryController.update);
categoryRoute.delete("/:id", ...roleGuard("moderator"), categoryController.remove);

export default categoryRoute;
