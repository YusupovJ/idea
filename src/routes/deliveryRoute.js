import { Router } from "express";
import { add, getAll, remove, update } from "../controllers/deliveryController.js";
import authGuard from "../middlewares/authGuard.js";
import roleGuard from "../middlewares/roleGuard.js";
import { addDeliveryValidator, getAllDeliveryValidator, updateDeliveryValidator } from "../validators/deliveryValidator.js";
import { isId } from "../validators/customValidators.js";

const deliveryRoute = Router();

deliveryRoute.post("/", authGuard, addDeliveryValidator, add);
deliveryRoute.get("/", ...roleGuard("deliver"), getAllDeliveryValidator, getAll);
deliveryRoute.patch("/:id", authGuard, updateDeliveryValidator, isId, update);
deliveryRoute.delete("/:id", authGuard, isId, remove);

export default deliveryRoute;
