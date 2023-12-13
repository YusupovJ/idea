import db from "../config/db.config.js";
import throwError from "../helpers/throwError.js";
import crypt from "../helpers/hash.js";
import token from "../helpers/generateTokens.js";

export const register = async (req, res) => {
    try {
        const { email, password, phone } = req.body;
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", email);

        if (user) {
            throwError("User already exists", 409);
        }

        const hashedPassword = crypt.hash(password);
        const newUser = {
            email,
            password: hashedPassword,
            phone,
        };

        const [createdUser] = await db.query("INSERT INTO users SET ?", newUser);

        const accessToken = token.generateAccessToken(createdUser.insertId, "user");
        const refreshToken = token.generateRefreshToken(createdUser.insertId, "user");

        res.end();
    } catch (error) {}
};

export const login = (req, res) => {};

export const logout = (req, res) => {};

export const refresh = (req, res) => {};
