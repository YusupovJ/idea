import { add, getAll, getOne, remove, update } from "../controllers/productController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { addProductValidator, updateProductValidator, getAllProductsValidator } from "../validators/productsValidator.js";

const productRoute = Router();

productRoute.post("/", ...roleGuard("moderator"), ...addProductValidator, add);
productRoute.get("/", getAll);
productRoute.get("/:id", getOne);
productRoute.patch("/:id", ...roleGuard("moderator"), ...getAllProductsValidator, ...updateProductValidator, update);
productRoute.delete("/:id", ...roleGuard("moderator"), remove);

export default productRoute;
