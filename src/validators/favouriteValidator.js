import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addFavouriteValidator = [body("product_id").isInt({ min: 1 }).withMessage("product_id must be id")];

export const getAllFavouriteValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];
