import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import checkValidation from "../helpers/checkValidation.js";
import { NotFound } from "../helpers/errors.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const newEvent = {
			name_ru: req.body.name_ru,
			name_uz: req.body.name_uz,
		};

		await db.query("INSERT INTO events SET ?", newEvent);

		apiResponse(res).send("Event successfully added", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const [[{ "COUNT(id)": totalItems }]] = await db.query("SELECT id FROM events");
		const pagination = new Pagination(totalItems, page, limit);

		const [events] = await db.query("SELECT * FROM events LIMIT ? OFFSET ?", [pagination.limit, pagination.offset]);

		apiResponse(res).send(events, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		const { id } = req.params;
		const [[event]] = await db.query("SELECT * FROM events WHERE id = ?", id);

		if (!event) {
			throw new NotFound("This event does not exist");
		}

		const updatedEvent = {
			...req.body,
			updated_at: new Date(),
		};

		await db.query("UPDATE events SET ? WHERE id = ?", [updatedEvent, id]);

		apiResponse(res).send("Event was successfully updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		const { id } = req.params;
		const [[event]] = await db.query("SELECT * FROM events WHERE id = ?", id);

		if (!event) {
			throw new NotFound("This event does not exist");
		}

		await db.query("DELETE FROM events WHERE id = ?", id);

		apiResponse(res).send("Event was successfully deleted");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
