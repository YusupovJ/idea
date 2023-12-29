import productController from "../controllers/productController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";
import { addProductValidator, updateProductValidator, getAllProductsValidator } from "../validators/productsValidator.js";

const productRoute = Router();

productRoute.post("/", ...roleGuard("moderator"), ...addProductValidator, productController.add);
productRoute.get("/", productController.getAll);
productRoute.patch("/:id", ...roleGuard("moderator"), ...getAllProductsValidator, ...updateProductValidator, productController.update);
productRoute.delete("/:id", ...roleGuard("moderator"), productController.remove);

export default productRoute;
