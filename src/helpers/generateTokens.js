import jwt from "jsonwebtoken";
import env from "../config/env.config";

const accessTokenSecret = env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = env.REFRESH_TOKEN_SECRET;

class Token {
    generateAccessToken(id, role) {
        const accessToken = jwt.sign({ id, role }, accessTokenSecret, { expiresIn: "15m" });
        return accessToken;
    }

    generateRefreshToken() {
        const refreshToken = jwt.sign({ id, role }, refreshTokenSecret, { expiresIn: "30d" });
        return refreshToken;
    }

    verifyAccessToken(accessToken) {
        const isTokenRight = jwt.verify(accessToken, accessTokenSecret);
        return isTokenRight;
    }

    verifyRefreshToken(refreshToken) {
        const isTokenRight = jwt.verify(refreshToken, refreshTokenSecret);
        return isTokenRight;
    }
}

export default new Token();
