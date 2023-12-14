import apiResponse from "../helpers/apiResponse.js";
import throwError from "../helpers/throwError.js";
import authGuard from "./authGuard.js";

const roleGuard = (...roles) => {
	return [
		authGuard,
		(req, res, next) => {
			try {
				if (!roles.includes(req.role)) {
					throwError("You do not have enough rights", 403);
				}

				next();
			} catch (error) {
				apiResponse(res).error(error.message, error.status);
			}
		},
	];
};

export default roleGuard;
