import { Router } from "express";
import authGuard from "../middlewares/authGuard.js";
import { add, getAll, remove } from "../controllers/favouriteController.js";
import { addFavouriteValidator, getAllFavouriteValidator } from "../validators/favouriteValidator.js";
import { isId } from "../validators/customValidators.js";

const favouriteRoute = Router();

favouriteRoute.post("/", authGuard, ...addFavouriteValidator, add);
favouriteRoute.get("/", authGuard, ...getAllFavouriteValidator, getAll);
favouriteRoute.delete("/:id", authGuard, isId, remove);

export default favouriteRoute;
