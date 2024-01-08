import { Router } from "express";
import { add, getAll, getOne, remove, update } from "../controllers/cartController.js";
import authGuard from "../middlewares/authGuard.js";
import { isId } from "../validators/customValidators.js";
import { addCartValidator, getAllCartValidator, updateCartValidator } from "../validators/cartValidator.js";

const cartRoute = Router();

cartRoute.post("/", authGuard, ...addCartValidator, add);
cartRoute.get("/", authGuard, ...getAllCartValidator, getAll);
cartRoute.get("/:id", authGuard, isId, getOne);
cartRoute.patch("/:id", authGuard, isId, ...updateCartValidator, update);
cartRoute.delete("/:id", authGuard, isId, remove);

export default cartRoute;
