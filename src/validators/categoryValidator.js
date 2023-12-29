import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addCategoryValidator = [
	body("name_uz").notEmpty().withMessage("Uzb name must be provided"),
	body("name_ru").notEmpty().withMessage("Ru name must be provided"),
	body("desc_ru").notEmpty().withMessage("Ru description must be provided"),
	body("desc_uz").notEmpty().withMessage("Uzb description must be provided"),
	body("images").optional().isURL().withMessage("Incorrect url of image"),
	body("attributes").optional().isArray().withMessage("attributes field must be an array of ids"),
	body("parent_id").optional().isInt({ min: 1 }).withMessage("Parent id must be integer and at least 1"),
];

export const getAllCategorysValidator = [query("page").optional().custom(paginationQuery), query("limit").optional().custom(paginationQuery)];

export const updateCategoryValidator = [
	body("name_uz").optional().isLength({ min: 1 }).withMessage("Uzb name must be provided"),
	body("name_ru").optional().isLength({ min: 1 }).withMessage("Ru name must be provided"),
	body("desc_ru").optional().isLength({ min: 1 }).withMessage("Ru description must be provided"),
	body("desc_uz").optional().isLength({ min: 1 }).withMessage("Uzb description must be provided"),
	body("images").optional().isURL().withMessage("Incorrect url of image"),
	body("attributes").optional().isArray().withMessage("attributes field must be an array of ids"),
	body("parent_id").optional().isInt({ min: 1 }).withMessage("Parent id must be integer and at least 1"),
];
