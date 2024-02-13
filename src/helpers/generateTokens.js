import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import { Unauthorized } from "./errors.js";

const accessTokenSecret = env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = env.REFRESH_TOKEN_SECRET;

/* 
    Class Token for generating json web tokens.
*/

class Token {
	generateAccessToken(id, role) {
		const accessToken = jwt.sign({ id, role }, accessTokenSecret, { expiresIn: "30d" });
		return accessToken;
	}

	generateRefreshToken(id, role) {
		const refreshToken = jwt.sign({ id, role }, refreshTokenSecret, { expiresIn: "30d" });
		return refreshToken;
	}

	verifyAccessToken(accessToken) {
		try {
			const payload = jwt.verify(accessToken, accessTokenSecret);
			return payload;
		} catch (error) {
			throw new Unauthorized("You must be authorized");
		}
	}

	verifyRefreshToken(refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, refreshTokenSecret);
			return payload;
		} catch (error) {
			throw new Unauthorized("You must be authorized");
		}
	}
}

export default new Token();
