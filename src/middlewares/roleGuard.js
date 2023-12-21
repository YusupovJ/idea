import apiResponse from "../helpers/apiResponse.js";
import { Forbidden } from "../helpers/errors.js";
import authGuard from "./authGuard.js";

const roleGuard = (...roles) => {
	return [
		authGuard,
		(req, res, next) => {
			try {
				if (!roles.includes(req.role)) {
					throw new Forbidden("You do not have an access");
				}

				next();
			} catch (error) {
				apiResponse(res).error(error.message, error.status);
			}
		},
	];
};

export default roleGuard;
