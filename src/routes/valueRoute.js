import { Router } from "express";
import { add, getAll, getOne, remove, update } from "../controllers/valueController.js";
import { isId } from "../validators/customValidators.js";
import { addValueValidator, updateValueValidator, getAllValuesValidator } from "../validators/valueValidator.js";
import roleGuard from "../middlewares/roleGuard.js";

const valueRoute = Router();

valueRoute.post("/", ...roleGuard("admin"), addValueValidator, add);
valueRoute.get("/", getAllValuesValidator, getAll);
valueRoute.get("/:id", isId, getOne);
valueRoute.patch("/:id", ...roleGuard("admin"), updateValueValidator, isId, update);
valueRoute.delete("/:id", ...roleGuard("admin"), isId, remove);

export default valueRoute;
