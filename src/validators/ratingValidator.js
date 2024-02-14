import { body } from "express-validator";

export const addRatingValidator = [body("rate").notEmpty().isFloat({ min: 1, max: 5 }).withMessage("rating must be between 1 and 5")];

export const updateRatingValidator = [body("rate").optional().isFloat({ min: 1, max: 5 }).withMessage("rating must be between 1 and 5")];
