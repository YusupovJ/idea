import { Router } from "express";
import { add, getAll, remove, update } from "../controllers/eventController.js";
import { addEventValidator, getAllEventsValidator } from "../validators/eventValidator.js";
import roleGuard from "../middlewares/roleGuard.js";
import { isId } from "../validators/customValidators.js";

const eventRoute = Router();

eventRoute.post("/", ...roleGuard("moderator"), ...addEventValidator, add);
eventRoute.get("/", ...getAllEventsValidator, getAll);
eventRoute.patch("/:id", ...roleGuard("moderator"), isId, update);
eventRoute.delete("/:id", ...roleGuard("moderator"), isId, remove);

export default eventRoute;
