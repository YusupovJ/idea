import { body, query } from "express-validator";
import { isUzMobilePhone, paginationQuery } from "./customValidators.js";

export const updateUserValidator = [
	body("name").optional().isLength({ min: 2 }).withMessage("Name must have at least 2 letters"),
	body("email").optional().isEmail().withMessage("Email is incorrect"),
	body("password")
		.optional()
		.isLength({ min: 8 })
		.withMessage("Password must have at least 8 characters"),
	body("phone").optional().custom(isUzMobilePhone).withMessage("Phone is incorrect"),
];

export const getAllUserValidator = [
	query("page").optional().custom(paginationQuery),
	query("limit").optional().custom(paginationQuery),
];
