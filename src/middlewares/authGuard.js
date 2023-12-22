import apiResponse from "../helpers/apiResponse.js";
import { Unauthorized } from "../helpers/errors.js";
import token from "../helpers/generateTokens.js";

const authGuard = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            throw new Unauthorized("You must be authorized");
        }

        const decodedToken = token.verifyAccessToken(accessToken);
        const { id, role } = decodedToken;

        req.id = id;
        req.role = role;

        next();
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
};

export default authGuard;
