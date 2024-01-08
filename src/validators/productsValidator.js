import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addProductValidator = [
	body("name_uz").notEmpty().withMessage("name_uz must be string"),
	body("name_ru").notEmpty().withMessage("name_ru must be string"),
	body("desc_ru").notEmpty().withMessage("desc_ru must be string"),
	body("desc_uz").notEmpty().withMessage("desc_uz must be string"),
	body("desc_short_uz").notEmpty().withMessage("desc_short_uz must be string"),
	body("desc_short_ru").notEmpty().withMessage("desc_short_ru must be string"),
	body("count").notEmpty().isInt({ min: 1 }).withMessage("count must be at least 1"),
	body("images").optional().isArray().withMessage("images must be an array of image urls"),
	body("price").notEmpty().isInt({ min: 100 }).withMessage("price must be at least 100"),
	body("discount").optional().isFloat({ min: 5, max: 100 }).withMessage("discount must be float and between 5% and 100%"),
	body("categories").optional().isArray().withMessage("categories must be an array of ids"),
	body("events").optional().isArray().withMessage("events must be an array of ids"),
	body("attribute_values").optional().isArray().withMessage("attribute_values must be an array of ids"),
];

export const getAllProductsValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateProductValidator = [
	body("name_uz").optional().isString().withMessage("name_uz must be string"),
	body("name_ru").optional().isString().withMessage("name_ru must be string"),
	body("desc_ru").optional().isString().withMessage("desc_ru must be string"),
	body("desc_uz").optional().isString().withMessage("desc_uz must be string"),
	body("desc_short_uz").optional().isString().withMessage("desc_short_uz must be string"),
	body("desc_short_ru").optional().isString().withMessage("desc_short_ru must be string"),
	body("count").optional().isInt({ min: 1 }).withMessage("count must be at least 1"),
	body("images").optional().isArray().withMessage("images must be an array of image urls"),
	body("price").optional().isInt({ min: 100 }).withMessage("price must be at least 100"),
	body("discount").optional().isFloat({ min: 5, max: 100 }).withMessage("discount must be float and between 5% and 100%"),
	body("categories").optional().isArray().withMessage("categories must be an array of ids"),
	body("events").optional().isArray().withMessage("events must be an array of ids"),
	body("attribute_values").optional().isArray().withMessage("attribute_values must be an array of ids"),
];
