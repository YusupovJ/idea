import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addCategoryValidator = [
	body("name_uz").notEmpty().isString().withMessage("name_uz must be string"),
	body("name_ru").notEmpty().isString().withMessage("name_ru must be string"),
	body("desc_ru").notEmpty().isString().withMessage("desc_ru must be string"),
	body("desc_uz").notEmpty().isString().withMessage("desc_uz must be string"),
	body("image").optional().isURL().withMessage("incorrect image"),
	body("attributes").optional().isArray().withMessage("attributes must be an array of ids"),
	body("parent_id").optional().isInt({ min: 1 }).withMessage("parent_id must be id"),
];

export const getAllCategorysValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateCategoryValidator = [
	body("name_uz").optional().isString().withMessage("name_uz must be string"),
	body("name_ru").optional().isString().withMessage("name_ru must be string"),
	body("desc_ru").optional().isString().withMessage("desc_ru must be string"),
	body("desc_uz").optional().isString().withMessage("desc_uz must be string"),
	body("image").optional().isURL().withMessage("incorrect image"),
	body("attributes").optional().isArray().withMessage("attributes must be an array of ids"),
	body("parent_id").optional().isInt({ min: 1 }).withMessage("parent_id must be id"),
];
