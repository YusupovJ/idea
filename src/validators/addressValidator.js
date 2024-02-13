import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addAddressValidator = [
	body("name").notEmpty().isString().withMessage("Name must be provided and type of string"),
	body("city").notEmpty().isString().withMessage("City must be provided and type of string"),
	body("region").notEmpty().isString().withMessage("Region must be provided and type of string"),
	body("street").notEmpty().isString().withMessage("Street must be provided and type of string"),
	body("house").notEmpty().isString().withMessage("House number must be provided and type of string"),
];

export const getAllAddressValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
	query("search").optional().isString().withMessage("search must be string"),
];

export const updateAddressValidator = [
	body("name").optional().isString().withMessage("Name must be string"),
	body("city").optional().isString().withMessage("City must be string"),
	body("region").optional().isString().withMessage("Region must be string"),
	body("street").optional().isString().withMessage("Street must be string"),
	body("house").optional().isString().withMessage("House number must be string"),
];
