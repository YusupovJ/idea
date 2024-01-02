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
		const [[attribute]] = await db.query("SELECT * FROM attributes WHERE id = ?", attributeId);

		if (!attribute) {
			throw new BadRequest(`There are no attributes with ${attributeId} id`);
		}

		await db.query("INSERT INTO attributes_categories SET ?", {
			attributes_id: attributeId,
			products_id,
		});
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
			images: body.images,
			parent_id: body.parent_id,
		};

		const [{ insertId }] = await db.query("INSERT INTO categories SET ?", newCategory);
		const [[addedCategory]] = await db.query("SELECT * FROM categories WHERE id = ?", insertId);

		const { attributes } = body;

		if (attributes) {
			await addAttributes(attributes, insertId);
		}

		apiResponse(res).send(addedCategory, null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const getCountQuery = "SELECT COUNT(id) FROM categories WHERE parent_id IS NULL";
		const [[{ "COUNT(id)": totalItems }]] = await db.query(getCountQuery);

		const { page, limit } = req.query;
		const pagination = new Pagination(totalItems, page, limit);

		const getCategoriesQuery = "SELECT * FROM categories WHERE parent_id IS NULL LIMIT ? OFFSET ?";
		const [categories] = await db.query(getCategoriesQuery, [pagination.limit, pagination.offset]);

		apiResponse(res).send(categories, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id } = req.params;
		const [[category]] = await db.query("SELECT * FROM categories WHERE id = ?", id);

		if (!category) {
			throw new NotFound("This category does not exist");
		}

		const updatedCategory = { ...req.body, updated_at: new Date() };

		await db.query("UPDATE categories SET ? WHERE id = ?", [updatedCategory, id]);

		const { attributes } = req.body;

		if (attributes) {
			await db.query("DELETE FROM attributes_categories WHERE products_id = ?", id);
			await addAttributes(attributes, id);
		}

		apiResponse(res).send("Category was succefully updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id } = req.params;
		const [[category]] = await db.query("SELECT * FROM categories WHERE id = ?", id);

		if (!category) {
			throw new NotFound("This category does not exist");
		}

		await db.query("DELETE FROM categories WHERE id = ?", id);

		apiResponse(res).send("Category was succefully deleted");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
