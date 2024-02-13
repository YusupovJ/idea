import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addAttributeValidator = [body("name").notEmpty().isString().withMessage("name must be provided")];

export const getAllAttributesValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateAttributeValidator = [body("name").optional().isString().withMessage("name must be provided")];
