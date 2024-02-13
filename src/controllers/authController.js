import db from "../config/db.config.js";
import crypt from "../helpers/hash.js";
import token from "../helpers/generateTokens.js";
import apiResponse from "../helpers/apiResponse.js";
import { BadRequest } from "../helpers/errors.js";
import checkValidation from "../helpers/checkValidation.js";

/* Update refresh token */
const updateUserRefreshToken = (newRefreshToken, userId) => {
	const hashedRefreshToken = crypt.hash(newRefreshToken);
	const updateQuery = "UPDATE users SET refresh_token = ? WHERE id = ?";

	db.query(updateQuery, [hashedRefreshToken, userId]);
};

export const register = async (req, res) => {
	try {
		checkValidation(req);

		const { email, password, phone, name } = req.body;
		const getQuery = "SELECT * FROM users WHERE email = ?";
		const [[user]] = await db.query(getQuery, email);

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

		const addQuery = "INSERT INTO users SET ?";
		const [addedUser] = await db.query(addQuery, newUser);

		const accessToken = token.generateAccessToken(addedUser.insertId, "user");
		const refreshToken = token.generateRefreshToken(addedUser.insertId, "user");

		apiResponse(res).send({ id: addedUser.insertId, name, email, phone, role: "user", accessToken, refreshToken }, null, 201);

		updateUserRefreshToken(refreshToken, addedUser.insertId);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const login = async (req, res) => {
	try {
		checkValidation(req);

		const { email, password } = req.body;
		const getQuery = "SELECT * FROM users WHERE email = ?";
		const [[user]] = await db.query(getQuery, email);

		if (!user) {
			throw new BadRequest("Password or email are incorrect");
		}

		const isRightPassword = crypt.compare(password, user.password);

		if (!isRightPassword) {
			throw new BadRequest("Password or email are incorrect");
		}

		const accessToken = token.generateAccessToken(user.id, user.role);
		const refreshToken = token.generateRefreshToken(user.id, user.role);

		let { id, name, phone, role } = user;

		apiResponse(res).send({ id, name, email, phone, role, accessToken, refreshToken });

		updateUserRefreshToken(refreshToken, user.id);
	} catch (error) {
		console.log(error);
		apiResponse(res).throw(error);
	}
};

export const refresh = async (req, res) => {
	try {
		checkValidation(req);

		const { refresh_token } = req.body;
		const decodedToken = token.verifyRefreshToken(refresh_token);

		const { id, role } = decodedToken;
		const getQuery = "SELECT * FROM users WHERE id = ?";
		const [[user]] = await db.query(getQuery, id);

		const isTokenRight = crypt.compare(refresh_token, user.refresh_token);

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

export const me = async (req, res) => {
	try {
		const { id } = req;
		const getQuery = `
      SELECT id, name, email, phone, role, created_at, updated_at 
      FROM users 
      WHERE id = ?
    `;
		const [[user]] = await db.query(getQuery, id);

		apiResponse(res).send(user);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
