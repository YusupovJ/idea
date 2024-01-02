import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addEventValidator = [
	body("name_uz").notEmpty().withMessage("Uzb name must be provided"),
	body("name_ru").notEmpty().withMessage("Ru name must be provided"),
];

export const getAllEventsValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];
