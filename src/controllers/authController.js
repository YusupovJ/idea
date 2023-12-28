import db from "../config/db.config.js";
import crypt from "../helpers/hash.js";
import token from "../helpers/generateTokens.js";
import apiResponse from "../helpers/apiResponse.js";
import { BadRequest } from "../helpers/errors.js";
import checkValidation from "../helpers/checkValidation.js";

const updateUserRefreshToken = (newRefreshToken, userId) => {
	const hashedRefreshToken = crypt.hash(newRefreshToken);
	const updateQuery = "UPDATE users SET refresh_token = ? WHERE id = ?";

	db.query(updateQuery, [hashedRefreshToken, userId]);
};

export const register = async (req, res) => {
	try {
		checkValidation(req);

		const { email, password, phone, name } = req.body;
		const selectQuery = "SELECT * FROM users WHERE email = ?";
		const [[user]] = await db.query(selectQuery, email);

		if (user) {
			throw new BadRequest("User already exists");
		}

		const hashedPassword = crypt.hash(password);
		const newUser = {
			email,
			password: hashedPassword,
			phone,
			name,
			role: "user",
		};

		const [createdUser] = await db.query("INSERT INTO users SET ?", newUser);

		const accessToken = token.generateAccessToken(createdUser.insertId, "user");
		const refreshToken = token.generateRefreshToken(createdUser.insertId, "user");

		apiResponse(res).send({ accessToken, refreshToken }, null, 201);

		updateUserRefreshToken(refreshToken, createdUser.insertId);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const login = async (req, res) => {
	try {
		checkValidation(req);

		const { email, password } = req.body;
		const selectQuery = "SELECT * FROM users WHERE email = ?";
		const [[user]] = await db.query(selectQuery, email);

		if (!user) {
			throw new BadRequest("Password or email are incorrect");
		}

		const isRightPassword = crypt.compare(password, user.password);

		if (!isRightPassword) {
			throw new BadRequest("Password or email are incorrect");
		}

		const accessToken = token.generateAccessToken(user.id, user.role);
		const refreshToken = token.generateRefreshToken(user.id, user.role);

		apiResponse(res).send({ accessToken, refreshToken });

		updateUserRefreshToken(refreshToken, user.id);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const refresh = async (req, res) => {
	try {
		checkValidation(req);

		const { refreshToken } = req.body;
		const decodedToken = token.verifyRefreshToken(refreshToken);

		const { id, role } = decodedToken;
		const selectQuery = "SELECT * FROM users WHERE id = ?";
		const [[user]] = await db.query(selectQuery, id);

		const isTokenRight = crypt.compare(refreshToken, user.refresh_token);
		console.log(isTokenRight);

		if (!isTokenRight) {
			throw new BadRequest("Your token is not valid");
		}

		const newAccessToken = token.generateAccessToken(id, role);
		const newRefreshToken = token.generateRefreshToken(id, role);

		apiResponse(res).send({
			refreshToken: newRefreshToken,
			accessToken: newAccessToken,
		});

		updateUserRefreshToken(newRefreshToken, id);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const logout = async (req, res) => {
	try {
		const updateQuery = "UPDATE users SET refresh_token = NULL WHERE id = ?";
		await db.query(updateQuery, req.id);

		apiResponse(res).send("You successfully logged out your account");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
