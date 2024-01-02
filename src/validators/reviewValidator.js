import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addReviewValidator = [
	body("productId").notEmpty().isInt({ min: 1 }).withMessage("Id of product must be an integer"),
	body("text").notEmpty().isString().withMessage("Text must be string"),
	body("rating").notEmpty().isFloat({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
	body("image").optional().isURL().withMessage("Image url failed"),
	body("answerTo").optional().isInt({ min: 1 }).withMessage("answerTo must be an integer"),
];

export const getAllReviewValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateReviewValidator = [
	body("productId").optional().isInt({ min: 1 }).withMessage("Id of product must be an integer"),
	body("text").optional().isString().withMessage("Text must be string"),
	body("rating").optional().isFloat({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
	body("image").optional().isURL().withMessage("Image url failed"),
	body("answerTo").optional().isInt({ min: 1 }).withMessage("answerTo must be an integer"),
];
