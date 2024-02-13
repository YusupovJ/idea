import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addProductValidator = [
	body("title").notEmpty().withMessage("title must be string"),
	body("description").notEmpty().withMessage("description must be string"),
	body("count").notEmpty().isInt({ min: 1 }).withMessage("count must be at least 1"),
	body("images").optional().isArray().withMessage("images must be an array of image urls"),
	body("price").notEmpty().isInt({ min: 100 }).withMessage("price must be at least 100"),
	body("discount").optional().isFloat({ min: 5, max: 100 }).withMessage("discount must be float and between 5% and 100%"),
	body("categories").optional().isArray().withMessage("categories must be an array of ids"),
	body("events").optional().isArray().withMessage("events must be an array of ids"),
	body("attribute_values").optional().isArray().withMessage("attribute_values must be an array of ids"),
];

const hasValue = (...availableValues) => {
	return (input) => {
		return availableValues.includes(input);
	};
};

const sortByValidation = hasValue("rating", "price", "orders", "views");

export const getAllProductsValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
	query("search").optional().isString().withMessage("search query must be string"),
	query("attributeValues").optional().isJSON().withMessage("attributeValues must be json array of ids"),
	query("sortBy").optional().custom(sortByValidation).withMessage("value of sortBy can be price, rating, orders and views"),
	query("orderBy").optional().custom(hasValue("ascending", "descending")).withMessage("value of orderBy can be ascending or descending"),
];

export const updateProductValidator = [
	body("title").optional().isString().withMessage("name_uz must be string"),
	body("description").optional().isString().withMessage("description must be string"),
	body("count").optional().isInt({ min: 1 }).withMessage("count must be at least 1"),
	body("images").optional().isArray().withMessage("images must be an array of image urls"),
	body("price").optional().isInt({ min: 100 }).withMessage("price must be at least 100"),
	body("discount").optional().isFloat({ min: 5, max: 100 }).withMessage("discount must be float and between 5% and 100%"),
	body("categories").optional().isArray().withMessage("categories must be an array of ids"),
	body("events").optional().isArray().withMessage("events must be an array of ids"),
	body("attribute_values").optional().isArray().withMessage("attribute_values must be an array of ids"),
];
