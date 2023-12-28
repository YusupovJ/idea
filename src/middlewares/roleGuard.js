import apiResponse from "../helpers/apiResponse.js";
import { Forbidden } from "../helpers/errors.js";
import authGuard from "./authGuard.js";

/* 
    Get roles array from arguments then get role from authGuard
    and using includes we can check if user has rights to the route.

    Using: 
        route.get("/url", ...roleGuard("role"), handler);
*/
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
				apiResponse(res).throw(error);
			}
		},
	];
};

export default roleGuard;
