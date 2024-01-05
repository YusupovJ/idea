import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addEventValidator = [
	body("name_uz").notEmpty().isString().withMessage("name_uz must be string"),
	body("name_ru").notEmpty().isString().withMessage("Ru name must be string"),
];

export const getAllEventsValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateEventValidator = [
	body("name_uz").optional().isString().withMessage("name_uz must be string"),
	body("name_ru").optional().isString().withMessage("Ru name must be string"),
];
