import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import checkValidation from "../helpers/checkValidation.js";
import { NotFound } from "../helpers/errors.js";

export const add = async (req, res) => {
    try {
        checkValidation(req);

        const { name_ru, name_uz } = req.body;

        const newEvent = { name_ru, name_uz };

        const addQuery = "INSERT INTO events SET ?";
        await db.query(addQuery, newEvent);

        apiResponse(res).send("Event created", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const getAll = async (req, res) => {
    try {
        checkValidation(req);

        const getTotalItemsQuery = "SELECT COUNT(id) FROM events";
        const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery);

        const { page, limit } = req.query;
        const pagination = new Pagination(totalItems, page, limit);

        const getQuery = "SELECT * FROM events LIMIT ? OFFSET ?";
        const [events] = await db.query(getQuery, [pagination.limit, pagination.offset]);

        apiResponse(res).send(events, pagination);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const update = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM events WHERE id = ?";
        const [[event]] = await db.query(getQuery, id);

        if (!event) {
            throw new NotFound("Event not found");
        }

        const updatedEvent = {
            ...req.body,
            updated_at: new Date(),
        };

        const updateQuery = "UPDATE events SET ? WHERE id = ?";
        await db.query(updateQuery, [updatedEvent, id]);

        apiResponse(res).send("Event updated", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const remove = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM events WHERE id = ?";
        const [[event]] = await db.query(getQuery, id);

        if (!event) {
            throw new NotFound("Event not found");
        }

        const delQuery = "DELETE FROM events WHERE id = ?";
        await db.query(delQuery, id);

        apiResponse(res).send("Event removed");
    } catch (error) {
        apiResponse(res).throw(error);
    }
};
