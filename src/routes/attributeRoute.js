import { Router } from "express";
import { add, getAll, getOne, remove, update } from "../controllers/attributeController.js";
import { isId } from "../validators/customValidators.js";
import { addAttributeValidator, getAllAttributesValidator, updateAttributeValidator } from "../validators/attributeValidator.js";
import roleGuard from "../middlewares/roleGuard.js";
import valueRoute from "./valueRoute.js";

const attributeRoute = Router();

attributeRoute.use("/values", valueRoute);

attributeRoute.post("/", ...roleGuard("admin"), addAttributeValidator, add);
attributeRoute.get("/", getAllAttributesValidator, getAll);
attributeRoute.get("/:id", isId, getOne);
attributeRoute.patch("/:id", ...roleGuard("admin"), updateAttributeValidator, isId, update);
attributeRoute.delete("/:id", ...roleGuard("admin"), isId, remove);

export default attributeRoute;
