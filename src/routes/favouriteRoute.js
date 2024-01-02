import { Router } from "express";
import authGuard from "../middlewares/authGuard.js";
import { add, getAll, remove } from "../controllers/favouriteController.js";
import { addFavouriteValidator } from "../validators/favouriteValidator.js";

const favouriteRoute = Router();

favouriteRoute.post("/", authGuard, ...addFavouriteValidator, add);
favouriteRoute.get("/", authGuard, getAll);
favouriteRoute.delete("/:id", authGuard, remove);

export default favouriteRoute;
