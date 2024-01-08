import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
    try {
        checkValidation(req);

        const { value_uz, value_ru, attribute_id } = req.body;

        const newValue = { value_uz, value_ru, attribute_id };

        const addQuery = "INSERT INTO attribute_values SET ?";
        await db.query(addQuery, newValue);

        apiResponse(res).send("Attribute value created", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const getAll = async (req, res) => {
    try {
        checkValidation(req);

        const getTotalItemsQuery = "SELECT COUNT(id) FROM attribute_values";
        const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery);

        const { page, limit } = req.query;
        const pagination = new Pagination(totalItems, page, limit);

        const getQuery = `
            SELECT * FROM attribute_values AS av
            JOIN attributes AS a
            ON a.id = av.attribute_id 
            LIMIT ? OFFSET ?`;
        const [values] = await db.query(getQuery, [pagination.limit, pagination.offset]);

        apiResponse(res).send(values, pagination);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const getOne = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = `
            SELECT av.attribute_id, av.id AS attr_value_id, a.name_uz, a.name_ru, av.value_uz, av.value_ru
            FROM attribute_values AS av
            JOIN attributes AS a
            ON a.id = av.attribute_id
            WHERE av.id = ?
        `;
        const [[value]] = await db.query(getQuery, id);

        if (!value) {
            throw new NotFound("Attribute value not found");
        }

        apiResponse(res).send(value);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const update = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM attribute_values WHERE id = ?";
        const [[value]] = await db.query(getQuery, id);

        if (!value) {
            throw new NotFound("Attribute value not found");
        }

        const updatedValue = req.body;

        const updateQuery = "UPDATE attribute_values SET ? WHERE id = ?";
        await db.query(updateQuery, [updatedValue, id]);

        apiResponse(res).send("Attribute value updated", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const remove = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM attribute_values WHERE id = ?";
        const [[value]] = await db.query(getQuery, id);

        if (!value) {
            throw new NotFound("Attribute value not found");
        }

        const delQuery = "DELETE FROM attribute_values WHERE id = ?";
        await db.query(delQuery, id);

        apiResponse(res).send("Attribute value deleted");
    } catch (error) {
        apiResponse(res).throw(error);
    }
};
