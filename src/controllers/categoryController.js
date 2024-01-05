import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import { BadRequest, NotFound } from "../helpers/errors.js";
import checkValidation from "../helpers/checkValidation.js";

/* 
    if there are attributes, we put them into 
    the attributes_categories table with products_id and attributes_id            
*/
const addAttributes = async (attributes, products_id) => {
    for (const attributeId of attributes) {
        const getQuery = "SELECT * FROM attributes WHERE id = ?";
        const [[attribute]] = await db.query(getQuery, attributeId);

        if (!attribute) {
            throw new BadRequest("Attribute not found");
        }

        const newRelation = {
            attributes_id: attributeId,
            products_id,
        };

        const addQuery = "INSERT INTO attributes_categories SET ?";
        await db.query(addQuery, newRelation);
    }
};

export const add = async (req, res) => {
    try {
        checkValidation(req);

        const { body } = req;
        const newCategory = {
            name_uz: body.name_uz,
            name_ru: body.name_ru,
            desc_uz: body.desc_uz,
            desc_ru: body.desc_ru,
            image: body.image,
            parent_id: body.parent_id,
        };

        const addQuery = "INSERT INTO categories SET ?";
        const [{ insertId }] = await db.query(addQuery, newCategory);

        const { attributes } = body;

        if (attributes) {
            await addAttributes(attributes, insertId);
        }

        apiResponse(res).send("Category created", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const getAll = async (req, res) => {
    try {
        checkValidation(req);

        const geTotalItemsQuery = "SELECT COUNT(id) FROM categories WHERE parent_id IS NULL";
        const [[{ "COUNT(id)": totalItems }]] = await db.query(geTotalItemsQuery);

        const { page, limit } = req.query;
        const pagination = new Pagination(totalItems, page, limit);

        const getQuery = "SELECT * FROM categories WHERE parent_id IS NULL LIMIT ? OFFSET ?";
        const [categories] = await db.query(getQuery, [pagination.limit, pagination.offset]);

        apiResponse(res).send(categories, pagination);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const getOne = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM categories WHERE id = ?";
        const [[categories]] = await db.query(getQuery, id);

        if (!address) {
            throw new NotFound("Category not found");
        }

        const updateViewsQuery = "UPDATE categories SET views = views + 1";
        await db.query(updateViewsQuery);

        const getAttrQuery = `
			SELECT * FROM attributes_categories AS ac
			JOIN attributes AS a
			ON a.id = ac.attributes_id
			WHERE ac.categories_id = ?
		`;

        const [attributes] = await db.query(getAttrQuery, id);

        categories.attributes = attributes;

        apiResponse(res).send(categories);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const update = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;

        const getQuery = "SELECT * FROM categories WHERE id = ?";
        const [[category]] = await db.query(getQuery, id);

        if (!category) {
            throw new NotFound("Category not found");
        }

        const updatedCategory = { ...req.body, updated_at: new Date() };

        const updateQuery = "UPDATE categories SET ? WHERE id = ?";
        await db.query(updateQuery, [updatedCategory, id]);

        const { attributes } = req.body;

        if (attributes) {
            const delQuery = "DELETE FROM attributes_categories WHERE products_id = ?";
            await db.query(delQuery, id);
            await addAttributes(attributes, id);
        }

        apiResponse(res).send("Category updated", null, 201);
    } catch (error) {
        apiResponse(res).throw(error);
    }
};

export const remove = async (req, res) => {
    try {
        checkValidation(req);

        const { id } = req.params;
        const getQuery = "SELECT * FROM categories WHERE id = ?";
        const [[category]] = await db.query(getQuery, id);

        if (!category) {
            throw new NotFound("Category not found");
        }

        const delQuery = "DELETE FROM categories WHERE id = ?";
        await db.query(delQuery, id);

        apiResponse(res).send("Category removed");
    } catch (error) {
        apiResponse(res).throw(error);
    }
};
