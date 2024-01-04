import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addAttributeValidator = [
	body("name_uz").notEmpty().isString().withMessage("name_uz must be provided"),
	body("name_ru").notEmpty().isString().withMessage("name_ru must be provided"),
];

export const getAllAttributesValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateAttributeValidator = [
	body("name_uz").optional().isString().withMessage("name_uz must be provided"),
	body("name_ru").optional().isString().withMessage("name_ru must be provided"),
];
