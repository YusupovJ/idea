import { body } from "express-validator";

export const addEventValidator = [body("name_uz").notEmpty().withMessage("Uzb name must be provided"), body("name_ru").notEmpty().withMessage("Ru name must be provided")];
