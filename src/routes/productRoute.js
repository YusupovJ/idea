import { add, getAll, getOne, remove, update } from "../controllers/productController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { addProductValidator, updateProductValidator, getAllProductsValidator } from "../validators/productsValidator.js";
import { isId } from "../validators/customValidators.js";

const productRoute = Router();

productRoute.post("/", ...roleGuard("admin"), ...addProductValidator, add);
productRoute.get("/", ...getAllProductsValidator, getAll);
productRoute.get("/:id", isId, getOne);
productRoute.patch("/:id", ...roleGuard("admin"), isId, ...updateProductValidator, update);
productRoute.delete("/:id", ...roleGuard("admin"), isId, remove);

export default productRoute;
