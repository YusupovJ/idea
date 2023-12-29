import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addProductValidator = [
	body("name_uz").notEmpty().withMessage("Uzb name must be provided"),
	body("name_ru").notEmpty().withMessage("Ru name must be provided"),
	body("desc_ru").notEmpty().withMessage("Ru description must be provided"),
	body("desc_uz").notEmpty().withMessage("Uzb description must be provided"),
	body("desc_short_uz").notEmpty().withMessage("Uzb short description must be provided"),
	body("desc_short_ru").notEmpty().withMessage("Ru short description must be provided"),
	body("count").notEmpty().isInt({ min: 1 }).withMessage("Count must be at least 1"),
	body("images").optional().isURL(),
	body("price").notEmpty().isInt({ min: 1000 }).withMessage("It is too cheap"),
	body("discount").optional().isFloat({ min: 5, max: 100 }).withMessage("Discount must be between 5% and 100%"),
	body("categories").optional().isArray().withMessage("categories field must be an array of ids"),
	body("events").optional().isArray().withMessage("events field must be an array of ids"),
	body("attributeValues").optional().isArray().withMessage("attributeValues field must be an array of ids"),
];

export const getAllProductsValidator = [query("page").optional().custom(paginationQuery), query("limit").optional().custom(paginationQuery)];

export const updateProductValidator = [
	body("name_uz").optional().isLength({ min: 1 }).withMessage("Uzb name must be provided"),
	body("name_ru").optional().isLength({ min: 1 }).withMessage("Ru name must be provided"),
	body("desc_ru").optional().isLength({ min: 1 }).withMessage("Ru description must be provided"),
	body("desc_uz").optional().isLength({ min: 1 }).withMessage("Uzb description must be provided"),
	body("desc_short_uz").optional().isLength({ min: 1 }).withMessage("Uzb short description must be provided"),
	body("desc_short_ru").optional().isLength({ min: 1 }).withMessage("Ru short description must be provided"),
	body("count").optional().isInt({ min: 1 }).withMessage("Count must be at least 1"),
	body("images").optional().isURL(),
	body("price").optional().isInt({ min: 1000 }).withMessage("It is too cheap"),
	body("discount").optional().isFloat({ min: 5, max: 100 }).withMessage("Discount must be between 5% and 100%"),
	body("categories").optional().isArray().withMessage("categories field must be an array of ids"),
	body("events").optional().isArray().withMessage("events field must be an array of ids"),
	body("attributeValues").optional().isArray().withMessage("attributeValues field must be an array of ids"),
];
