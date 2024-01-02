import { body } from "express-validator";

export const addFavouriteValidator = [body("productId").isInt({ min: 1 })];
