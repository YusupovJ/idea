import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import { Forbidden, NotFound } from "../helpers/errors.js";
import crypt from "../helpers/hash.js";
import checkValidation from "../helpers/checkValidation.js";
import Token from "../helpers/generateTokens.js";

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const getTotalItemsQuery = "SELECT COUNT(id) FROM users";
		const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery);

		const { page, limit } = req.query;
		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = "SELECT id, name, email, phone, created_at, updated_at FROM users LIMIT ? OFFSET ?";
		const [users] = await db.query(getQuery, [pagination.limit, pagination.offset]);

		apiResponse(res).send(users, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id, role } = req;
		const paramsId = req.params.id;

		const getQuery = "SELECT * FROM users WHERE id = ?";
		const [[user]] = await db.query(getQuery, paramsId);

		if (!user) {
			throw new NotFound("User not found");
		}

		/* 
      if role is admin, we have an access for updating user, but if role
      is user and id from database and our id are same, we also have an access
    */

		if (role === "admin" || (role === "user" && id === +paramsId)) {
			const { body } = req;
			const updatedUser = { ...body, updated_at: new Date() };

			// if we change password, we hash it again
			if (updatedUser.password) {
				const newHashedPassword = crypt.hash(updatedUser.password);

				updatedUser.password = newHashedPassword;
			}

			if (updatedUser.role) {
				const refreshToken = Token.generateRefreshToken(id, updatedUser.role);
				const hashedRefreshToken = crypt.hash(refreshToken);

				res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

				updatedUser.refresh_token = hashedRefreshToken;
			}

			const updateQuery = "UPDATE users SET ? WHERE id = ?";
			await db.query(updateQuery, [updatedUser, paramsId]);

			return apiResponse(res).send("User was successfully updated", null, 201);
		}

		throw new Forbidden("You cannot update this account");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id, role } = req;
		const paramsId = req.params.id;

		const getQuery = "SELECT * FROM users WHERE id = ?";
		const [[user]] = await db.query(getQuery, paramsId);

		if (!user) {
			throw new NotFound("User not found");
		}

		/* 
            Same situation as in update handler.
        */
		if (role === "admin" || (role === "user" && id === paramsId)) {
			const delQuery = "DELETE FROM users WHERE id = ?";
			await db.query(delQuery, paramsId);

			return apiResponse(res).send("User removed");
		}

		throw new Forbidden("You cannot remove this account");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
