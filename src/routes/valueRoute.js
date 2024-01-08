import { Router } from "express";
import { add, getAll, getOne, remove, update } from "../controllers/valueController.js";
import { isId } from "../validators/customValidators.js";
import { addValueValidator, updateValueValidator, getAllValuesValidator } from "../validators/valueValidator.js";
import roleGuard from "../middlewares/roleGuard.js";

const valueRoute = Router();

valueRoute.post("/", ...roleGuard("moderator"), addValueValidator, add);
valueRoute.get("/", ...roleGuard("moderator"), getAllValuesValidator, getAll);
valueRoute.get("/:id", ...roleGuard("moderator"), isId, getOne);
valueRoute.patch("/:id", ...roleGuard("moderator"), updateValueValidator, isId, update);
valueRoute.delete("/:id", ...roleGuard("moderator"), isId, remove);

export default valueRoute;
