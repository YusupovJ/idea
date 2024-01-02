import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addFavouriteValidator = [body("productId").isInt({ min: 1 })];

export const getAllFavouriteValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];
