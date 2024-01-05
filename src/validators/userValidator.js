import { body, query } from "express-validator";
import { isUzMobilePhone, paginationQuery } from "./customValidators.js";

export const updateUserValidator = [
	body("name").optional().isLength({ min: 2 }).withMessage("name must have at least 2 letters"),
	body("email").optional().isEmail().withMessage("inccrrect email"),
	body("password").optional().isLength({ min: 8 }).withMessage("password must have at least 8 characters"),
	body("phone").optional().custom(isUzMobilePhone).withMessage("incorrect phone"),
];

export const getAllUserValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];
