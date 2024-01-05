import { body, query } from "express-validator";
import { paginationQuery } from "./customValidators.js";

export const addDeliveryValidator = [
	body("address_id").notEmpty().isInt({ min: 1 }).withMessage("address_id must be id"),
	body("deliver_id").notEmpty().isInt({ min: 1 }).withMessage("deliver_id must be id"),
	body("delivery_fee").notEmpty().isInt({ min: 0 }).withMessage("delivery_fee must be integer"),
	body("total_price").notEmpty().isInt({ min: 0 }).withMessage("total_price must be integer"),
	body("note").optional().isString().withMessage("note must be string"),
];

export const getAllDeliveryValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateDeliveryValidator = [
	body("address_id").optional().isInt({ min: 1 }).withMessage("address_id must be id"),
	body("deliver_id").optional().isInt({ min: 1 }).withMessage("deliver_id must be id"),
	body("delivery_fee").optional().isInt({ min: 0 }).withMessage("delivery_fee must be integer"),
	body("total_price").optional().isInt({ min: 0 }).withMessage("total_price must be integer"),
	body("note").optional().isString().withMessage("note must be string"),
];
