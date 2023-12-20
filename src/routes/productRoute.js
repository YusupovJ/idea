import productController from "../controllers/productController.js";
import roleGuard from "../middlewares/roleGuard.js";
import { Router } from "express";

const productRoute = Router();

productRoute.post("/", ...roleGuard("moderator"), productController.add);
productRoute.get("/", productController.getAll);
productRoute.patch("/:id", ...roleGuard("moderator"), productController.update);
productRoute.delete("/:id", ...roleGuard("moderator"), productController.remove);

export default productRoute;
