import { Router } from "express";
import { add, getAll, remove, update } from "../controllers/attributeController.js";
import { isId } from "../validators/customValidators.js";
import { addAttributeValidator, getAllAttributesValidator, updateAttributeValidator } from "../validators/attributeValidator.js";
import roleGuard from "../middlewares/roleGuard.js";
import valueRoute from "./valueRoute.js";

const attributeRoute = Router();

attributeRoute.use("/values", valueRoute);

attributeRoute.post("/", ...roleGuard("moderator"), addAttributeValidator, add);
attributeRoute.get("/", ...roleGuard("moderator"), getAllAttributesValidator, getAll);
attributeRoute.patch("/:id", ...roleGuard("moderator"), updateAttributeValidator, isId, update);
attributeRoute.delete("/:id", ...roleGuard("moderator"), isId, remove);

export default attributeRoute;
