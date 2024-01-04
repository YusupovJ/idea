import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addValueValidator = [
	body("value_uz").notEmpty().isString().withMessage("value_uz must be string"),
	body("value_ru").notEmpty().isString().withMessage("value_ru must be string"),
	body("attribute_id").notEmpty().isInt({ min: 1 }).withMessage("attribute_id must be id"),
];

export const getAllValuesValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateValueValidator = [
	body("value_uz").optional().isString().withMessage("value_uz must be string"),
	body("value_ru").optional().isString().withMessage("value_ru must be string"),
	body("attribute_id").optional().isInt({ min: 1 }).withMessage("attribute_id must be id"),
];
