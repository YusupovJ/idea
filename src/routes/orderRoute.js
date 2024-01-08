import { Router } from "express";
import authGuard from "../middlewares/authGuard.js";
import { addOrderValidator, getAllOrderValidator, updateOrderValidator } from "../validators/orderValidator.js";
import { add, getAll, getOne, remove, update } from "../controllers/orderController.js";
import { isId } from "../validators/customValidators.js";

const orderRoute = Router();

orderRoute.post("/", authGuard, addOrderValidator, add);
orderRoute.get("/", authGuard, getAllOrderValidator, getAll);
orderRoute.get("/:id", authGuard, isId, getOne);
orderRoute.patch("/:id", authGuard, updateOrderValidator, isId, update);
orderRoute.delete("/:id", authGuard, isId, remove);

export default orderRoute;
