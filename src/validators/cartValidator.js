import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addCartValidator = [
	body("productId").notEmpty().isInt({ min: 1 }).withMessage("productId must be an id"),
	body("count").notEmpty().isInt({ min: 1 }).withMessage("count must be an integer"),
];

export const updateCartValidator = [
	body("productId").optional().isInt({ min: 1 }).withMessage("productId must be an id"),
	body("count").optional().isInt({ min: 1 }).withMessage("count must be an integer"),
];

export const getAllCartValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];
