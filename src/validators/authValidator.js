import { body } from "express-validator";
import { isUzMobilePhone } from "./customValidators.js";

export const registerValidator = [
	body("name").notEmpty().isLength({ min: 2 }).withMessage("name must have at least 2 letters"),
	body("email").notEmpty().isEmail().withMessage("incorrect email"),
	body("password").notEmpty().isLength({ min: 8 }).withMessage("password must have at least 8 characters"),
	body("phone").optional().custom(isUzMobilePhone).withMessage("incorrect phone, example: +998901234567"),
];

export const loginValidator = [
	body("email").notEmpty().isEmail().withMessage("incorrect email"),
	body("password").notEmpty().withMessage("password must be provided"),
];
