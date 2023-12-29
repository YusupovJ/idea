import { add, getAll, remove, update } from "../controllers/categoryController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { addCategoryValidator, getAllCategorysValidator, updateCategoryValidator } from "../validators/categoryValidator.js";

const categoryRoute = Router();

categoryRoute.post("/", ...roleGuard("moderator"), ...addCategoryValidator, add);
categoryRoute.get("/", ...getAllCategorysValidator, getAll);
categoryRoute.patch("/:id", ...roleGuard("moderator"), ...updateCategoryValidator, update);
categoryRoute.delete("/:id", ...roleGuard("moderator"), remove);

export default categoryRoute;
