import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addValueValidator = [
	body("value").notEmpty().isString().withMessage("value must be string"),
	body("attribute_id").notEmpty().isInt({ min: 1 }).withMessage("attribute_id must be id"),
];

export const getAllValuesValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateValueValidator = [
	body("value").optional().isString().withMessage("value must be string"),
	body("attribute_id").optional().isInt({ min: 1 }).withMessage("attribute_id must be id"),
];
