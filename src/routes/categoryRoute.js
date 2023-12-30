import { add, getAll, remove, update } from "../controllers/categoryController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { addCategoryValidator, getAllCategorysValidator, updateCategoryValidator } from "../validators/categoryValidator.js";
import { isId } from "../validators/customValidators.js";

const categoryRoute = Router();

categoryRoute.post("/", ...roleGuard("moderator"), ...addCategoryValidator, add);
categoryRoute.get("/", ...getAllCategorysValidator, getAll);
categoryRoute.patch("/:id", ...roleGuard("moderator"), ...updateCategoryValidator, isId, update);
categoryRoute.delete("/:id", ...roleGuard("moderator"), isId, remove);

export default categoryRoute;
