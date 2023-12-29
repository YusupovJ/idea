import { body } from "express-validator";
import { isUzMobilePhone } from "./customValidators.js";

export const registerValidator = [
	body("name").notEmpty().isLength({ min: 2 }).withMessage("Name must have at least 2 letters"),
	body("email").notEmpty().isEmail().withMessage("Email is incorrect"),
	body("password").notEmpty().isLength({ min: 8 }).withMessage("Password must have at least 8 characters"),
	body("phone").optional().custom(isUzMobilePhone).withMessage("Phone is incorrect"),
];

export const loginValidator = [body("email").notEmpty().isEmail().withMessage("Email is incorrect"), body("password").notEmpty().withMessage("Password must be provided")];

export const refreshValidator = [body("refreshToken").notEmpty().withMessage("Refresh token must be provided")];
