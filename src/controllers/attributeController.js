import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
    try {
        checkValidation(req);

        const { name_uz, name_ru } = req.body;

        const newAttribute = { name_uz, name_ru };

        const addQuery = "INSERT INTO attributes SET ?";
        await db.query(addQuery, newAttribute);

        apiResponse(res).send("Attribute created", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const getAll = async (req, res) => {
    try {
        checkValidation(req);

        const getTotalItemsQuery = "SELECT COUNT(id) FROM attributes";
        const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery);

        const { page, limit } = req.query;
        const pagination = new Pagination(totalItems, page, limit);

        const getAttributesQuery = "SELECT * FROM attributes LIMIT ? OFFSET ?";
        const [attributes] = await db.query(getAttributesQuery, [pagination.limit, pagination.offset]);

        apiResponse(res).send(attributes, pagination);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const getOne = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = `
            SELECT av.attribute_id, av.id AS attr_value_id AS a.name_uz, a.name_ru, av.value_uz, av.value_ru
            FROM attribute_values AS av
            JOIN attribute AS a
            ON a.id = av.attribute_id
            WHERE id = ?
        `;
        const [[address]] = await db.query(getQuery, id);

        if (!address) {
            throw new NotFound("Attribute not found");
        }

        apiResponse(res).send(address);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const update = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM attributes WHERE id = ?";
        const [[attribute]] = await db.query(getQuery, id);

        if (!attribute) {
            throw new NotFound("Attribute not found");
        }

        const updatedAttribute = req.body;

        const updateQuery = "UPDATE attributes SET ? WHERE id = ?";
        await db.query(updateQuery, [updatedAttribute, id]);

        apiResponse(res).send("Attribute updated", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const remove = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM attributes WHERE id = ?";
        const [[attribute]] = await db.query(getQuery, id);

        if (!attribute) {
            throw new NotFound("Attribute not found");
        }

        const delQuery = "DELETE FROM attributes WHERE id = ?";
        await db.query(delQuery, id);

        apiResponse(res).send("Attribute removed");
    } catch (error) {
        apiResponse(res).throw(error);
    }
};
