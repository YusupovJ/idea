import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addEventValidator = [body("name").notEmpty().isString().withMessage("name must be string")];

export const getAllEventsValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateEventValidator = [body("name").optional().isString().withMessage("name must be string")];
