import { body, query } from "express-validator";

export const addDeliveryValidator = [
	body("addressId").notEmpty().isInt({ min: 1 }).withMessage("addressId must be id"),
	body("deliverId").notEmpty().isInt({ min: 1 }).withMessage("deliverId must be id"),
	body("deliveryFee").notEmpty().isInt({ min: 0 }).withMessage("delivery fee must be provided"),
	body("note").optional().isString().withMessage("note must be string"),
];

export const getAllDeliveryValidator = [
	query("page").optional().custom(paginationQuery).withMessage("page must be an integer and no less than 1"),
	query("limit").optional().custom(paginationQuery).withMessage("limit must be an integer and no less than 1"),
];

export const updateDeliveryValidator = [
	body("addressId").optional().isInt({ min: 1 }).withMessage("addressId must be id"),
	body("deliverId").optional().isInt({ min: 1 }).withMessage("deliverId must be id"),
	body("deliveryFee").optional().isInt({ min: 0 }).withMessage("delivery fee must be provided"),
	body("note").optional().isString().withMessage("note must be string"),
];
