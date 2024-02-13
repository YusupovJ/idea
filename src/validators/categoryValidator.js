import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addCategoryValidator = [
	body("name").notEmpty().isString().withMessage("name must be string"),
	body("description").optional().isString().withMessage("description must be string"),
	body("image").optional().isURL().withMessage("incorrect image"),
	body("attributes").optional().isArray().withMessage("attributes must be an array of ids"),
];

export const getAllCategorysValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateCategoryValidator = [
	body("name").optional().isString().withMessage("name must be string"),
	body("description").optional().isString().withMessage("description must be string"),
	body("image").optional().isURL().withMessage("incorrect image"),
	body("attributes").optional().isArray().withMessage("attributes must be an array of ids"),
];
