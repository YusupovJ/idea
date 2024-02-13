import { add, getAll, getOne, remove, update } from "../controllers/categoryController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { addCategoryValidator, getAllCategorysValidator, updateCategoryValidator } from "../validators/categoryValidator.js";
import { isId } from "../validators/customValidators.js";

const categoryRoute = Router();

categoryRoute.post("/", ...roleGuard("admin"), ...addCategoryValidator, add);
categoryRoute.get("/", ...getAllCategorysValidator, getAll);
categoryRoute.get("/:id", isId, getOne);
categoryRoute.patch("/:id", ...roleGuard("admin"), ...updateCategoryValidator, isId, update);
categoryRoute.delete("/:id", ...roleGuard("admin"), isId, remove);

export default categoryRoute;
