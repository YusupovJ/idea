import jwt from "jsonwebtoken";
import env from "../config/env.config.js";

const accessTokenSecret = env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = env.REFRESH_TOKEN_SECRET;

/* 
    Class Token for generating json web tokens.
*/

class Token {
	generateAccessToken(id, role) {
		const accessToken = jwt.sign({ id, role }, accessTokenSecret, { expiresIn: "15m" });
		return accessToken;
	}

	generateRefreshToken(id, role) {
		const refreshToken = jwt.sign({ id, role }, refreshTokenSecret, { expiresIn: "30d" });
		return refreshToken;
	}

	verifyAccessToken(accessToken) {
		const payload = jwt.verify(accessToken, accessTokenSecret);
		return payload;
	}

	verifyRefreshToken(refreshToken) {
		const payload = jwt.verify(refreshToken, refreshTokenSecret);
		return payload;
	}
}

export default new Token();
