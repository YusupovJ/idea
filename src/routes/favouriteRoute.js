import { Router } from "express";
import authGuard from "../middlewares/authGuard.js";
import { add, getAll, remove } from "../controllers/favouriteController.js";

const favouriteRoute = Router();

favouriteRoute.post("/", authGuard, add);
favouriteRoute.get("/", authGuard, getAll);
favouriteRoute.delete("/:id", authGuard, remove);

export default favouriteRoute;
