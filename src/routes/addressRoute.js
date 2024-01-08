import { Router } from "express";
import authGuard from "../middlewares/authGuard.js";
import { add, getAll, getOne, remove, update } from "../controllers/addressController.js";
import { addAddressValidator, getAllAddressValidator, updateAddressValidator } from "../validators/addressValidator.js";
import { isId } from "../validators/customValidators.js";

const addressRoute = Router();

addressRoute.post("/", authGuard, addAddressValidator, add);
addressRoute.get("/", authGuard, getAllAddressValidator, getAll);
addressRoute.get("/:id", authGuard, isId, getOne);
addressRoute.patch("/:id", authGuard, updateAddressValidator, isId, update);
addressRoute.delete("/:id", authGuard, isId, remove);

export default addressRoute;
