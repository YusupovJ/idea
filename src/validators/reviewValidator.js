import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addReviewValidator = [
	body("product_id").notEmpty().isInt({ min: 1 }).withMessage("product_id must be id"),
	body("text").notEmpty().isString().withMessage("text must be string"),
	body("rating").notEmpty().isFloat({ min: 1, max: 5 }).withMessage("rating must be between 1 and 5"),
	body("image").optional().isURL().withMessage("incorrect image"),
	body("answer_to").optional().isInt({ min: 1 }).withMessage("answer_to must be id"),
];

export const getAllReviewValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateReviewValidator = [
	body("product_id").optional().isInt({ min: 1 }).withMessage("product_id must be id"),
	body("text").optional().isString().withMessage("text must be string"),
	body("rating").optional().isFloat({ min: 1, max: 5 }).withMessage("rating must be between 1 and 5"),
	body("image").optional().isURL().withMessage("incorrect image"),
	body("answer_to").optional().isInt({ min: 1 }).withMessage("answer_to must be id"),
];
