import db from "../config/db.config.js";
import apiResponse from "../helpers/apiResponse.js";
import Pagination from "../helpers/pagination.js";
import checkValidation from "../helpers/checkValidation.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { name, city, region, street, house } = req.body;

		const newAddress = { name, city, region, street, house, user_id: req.id };

		const addQuery = "INSERT INTO address SET ?";
		await db.query(addQuery, newAddress);

		apiResponse(res).send("Address created", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId } = req;
		const getTotalItemsQuery = "SELECT COUNT(id) FROM address WHERE user_id = ?";
		const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery, +userId);

		const { page, limit } = req.query;
		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = "SELECT * FROM address WHERE user_id = ? LIMIT ? OFFSET ?";
		const [address] = await db.query(getQuery, [userId, pagination.limit, pagination.offset]);

		apiResponse(res).send(address, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId } = req;
		const { id: addressId } = req.params;

		const getQuery = "SELECT * FROM address WHERE id = ? AND user_id = ?";
		const [[address]] = await db.query(getQuery, [addressId, userId]);

		if (!address) {
			throw new NotFound("Address does not exist");
		}

		const updatedAddress = { ...req.body, updated_at: new Date() };

		const updateQuery = "UPDATE address SET ? WHERE id = ?";
		await db.query(updateQuery, [updatedAddress, addressId]);

		apiResponse(res).send("Address updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId } = req;
		const { id: addressId } = req.params;

		const getQuery = "SELECT * FROM address WHERE id = ? AND user_id = ?";
		const [[address]] = await db.query(getQuery, [addressId, userId]);

		if (!address) {
			throw new NotFound("Address does not exist");
		}

		const delQuery = "DELETE FROM address WHERE id = ?";
		await db.query(delQuery, addressId);

		apiResponse(res).send("Address removed");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
