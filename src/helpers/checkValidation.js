import { validationResult } from "express-validator";
import { ValidationError } from "./errors.js";

const checkValidation = (req) => {
	const result = validationResult(req);

	if (!result.isEmpty()) {
		throw new ValidationError(result.array());
	}
};

export default checkValidation;
