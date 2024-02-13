import { Router } from "express";
import { add, getAll, getOne, remove, update } from "../controllers/eventController.js";
import { addEventValidator, getAllEventsValidator, updateEventValidator } from "../validators/eventValidator.js";
import roleGuard from "../middlewares/roleGuard.js";
import { isId } from "../validators/customValidators.js";

const eventRoute = Router();

eventRoute.post("/", ...roleGuard("admin"), ...addEventValidator, add);
eventRoute.get("/", ...getAllEventsValidator, getAll);
eventRoute.get("/:id", isId, getOne);
eventRoute.patch("/:id", ...roleGuard("admin"), updateEventValidator, isId, update);
eventRoute.delete("/:id", ...roleGuard("admin"), isId, remove);

export default eventRoute;
