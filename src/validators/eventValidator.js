import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addEventValidator = [
	body("name").notEmpty().isString().withMessage("name must be string"),
	body("start_date").notEmpty().isISO8601().toDate().withMessage("start_date must be datetime"),
	body("end_date").notEmpty().isISO8601().toDate().withMessage("end_date must be datetime"),
	body("image").optional().isURL().withMessage("image must be url"),
];

export const getAllEventsValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateEventValidator = [
	body("name").optional().isString().withMessage("name must be string"),
	body("start_date").optional().isISO8601().toDate().withMessage("start_date must be datetime"),
	body("end_date").optional().isISO8601().toDate().withMessage("end_date must be datetime"),
	body("image").optional().isURL().withMessage("image must be url"),
];
