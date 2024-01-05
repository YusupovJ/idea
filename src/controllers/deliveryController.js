import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { address_id, deliver_id, delivery_fee, note, total_price } = req.body;

		const getDeliverQuery = "SELECT * FROM users WHERE id = ?";
		const [[deliver]] = await db.query(getDeliverQuery, deliver_id);

		if (!deliver) {
			throw new NotFound("Deliver not found");
		}

		const getAddressQuery = "SELECT * FROM address WHERE id = ?";
		const [[address]] = await db.query(getAddressQuery, address_id);

		if (!address) {
			throw new NotFound("Address not found");
		}

		const newDelivery = {
			address_id,
			deliver_id,
			delivery_fee,
			note,
			total_price,
		};

		const addQuery = "INSERT INTO delivery SET ?";
		await db.query(addQuery, newDelivery);

		apiResponse(res).send("Delivery created", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const { id: deliverId } = req;
		const { page, limit } = req.query;

		const getTotalItemsQuery = "SELECT COUNT(id) FROM delivery WHERE deliver_id = ?";
		const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery, deliverId);

		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = "SELECT * FROM delivery WHERE deliver_id = ? LIMIT ? OFFSET ?";

		const [delivery] = await db.query(getQuery, [deliverId, pagination.limit, pagination.offset]);

		apiResponse(res).send(delivery, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id: deliveryId } = req.params;
		const { id: deliverId } = req;

		const getQuery = "SELECT * FROM delivery WHERE id = ? AND deliver_id = ?";
		const [[delivery]] = await db.query(getQuery, [deliveryId, deliverId]);

		if (!delivery) {
			throw new NotFound("Delivery not found");
		}

		const updatedDelivery = { ...req.body, updated_at: new Date() };

		const updateQuery = "UPDATE delivery SET ? WHERE id = ?";
		await db.query(updateQuery, [updatedDelivery, deliveryId]);

		apiResponse(res).send("Delivery updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id: deliveryId } = req.params;
		const { id: deliverId } = req;

		const getQuery = "SELECT * FROM delivery WHERE id = ? AND deliver_id = ?";
		const [[delivery]] = await db.query(getQuery, [deliveryId, deliverId]);

		if (!delivery) {
			throw new NotFound("Delivery not found");
		}

		const delQuery = "DELETE FROM delivery WHERE id = ?";
		await db.query(delQuery, deliveryId);

		apiResponse(res).send("Delivery deleted");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
