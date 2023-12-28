import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import { BadRequest, NotFound } from "../helpers/errors.js";
import checkValidation from "../helpers/checkValidation.js";

/* 
    addCategories, addEvents, addAttributeValues are functions for
    adding their id into the tables with relation - many to many
*/

const addCategories = async (categories, products_id) => {
	for (const categoryId of categories) {
		const [[category]] = await db.query("SELECT * FROM categories WHERE id = ?", categoryId);

		if (!category) {
			throw new BadRequest(`There are no categories with ${categoryId} id`);
		}

		await db.query("INSERT INTO products_categories SET ?", {
			categories_id: categoryId,
			products_id,
		});
	}
};

const addEvents = async (events, products_id) => {
	for (const eventId of events) {
		const [[event]] = await db.query("SELECT * FROM events WHERE id = ?", eventId);

		if (!event) {
			throw new BadRequest(`There are no events with ${eventId} id`);
		}

		await db.query("INSERT INTO events_products SET ?", {
			events_id: eventId,
			products_id,
		});
	}
};

const addAttributeValues = async (attributeValues, products_id) => {
	for (const attributeValueId of attributeValues) {
		const [[event]] = await db.query(
			"SELECT * FROM attribute_values WHERE id = ?",
			attributeValueId
		);

		if (!event) {
			throw new BadRequest(`There are no attributes with ${attributeValueId} id`);
		}

		await db.query("INSERT INTO attribute_values_products SET ?", {
			attribute_values_id: attributeValueId,
			products_id,
		});
	}
};

const add = async (req, res) => {
	try {
		checkValidation(req);

		const { body } = req;
		const newProduct = {
			name_uz: body.name_uz,
			name_ru: body.name_ru,
			desc_uz: body.desc_uz,
			desc_ru: body.desc_ru,
			desc_short_uz: body.desc_short_uz,
			desc_short_ru: body.desc_short_ru,
			images: body.images,
			price: body.price,
			discount: body.discount,
		};

		const [{ insertId }] = await db.query("INSERT INTO products SET ?", newProduct);
		const [[addedProduct]] = await db.query("SELECT * FROM products WHERE id = ?", insertId);

		const { categories, events, attributeValues } = body;

		if (categories) {
			await addCategories(categories, insertId);
		}

		if (events) {
			await addEvents(categories, insertId);
		}

		if (attributeValues) {
			await addAttributeValues(categories, insertId);
		}

		apiResponse(res).send(addedProduct, null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const [[{ "COUNT(id)": totalItems }]] = await db.query("SELECT COUNT(id) FROM products");

		const { page, limit } = req.query;
		const pagination = new Pagination(totalItems, page, limit);

		const [products] = await db.query("SELECT * FROM products LIMIT ? OFFSET ?", [
			pagination.limit,
			pagination.offset,
		]);

		apiResponse(res).send(products, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id } = req.params;
		const [[product]] = await db.query("SELECT * FROM products WHERE id = ?", id);

		if (!product) {
			throw new NotFound("This product does not exist");
		}

		const updatedProduct = { ...req.body, updated_at: new Date() };

		await db.query("UPDATE products SET ? WHERE id = ?", [updatedProduct, id]);

		const { categories, events, attributeValues } = body;

		if (categories) {
			await db.query("DELETE FROM products_categories WHERE products_id = ?", id);
			await addCategories(categories, insertId);
		}

		if (events) {
			await db.query("DELETE FROM events_products WHERE products_id = ?", id);
			await addEvents(categories, insertId);
		}

		if (attributeValues) {
			await db.query("DELETE FROM attribute_values_products WHERE products_id = ?", id);
			await addAttributeValues(categories, insertId);
		}

		apiResponse(res).send("Product was succefully updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

const remove = async (req, res) => {
	try {
		const { id } = req.params;
		const [[product]] = await db.query("SELECT * FROM products WHERE id = ?", id);

		if (!product) {
			throw new NotFound("This product does not exist");
		}

		await db.query("DELETE FROM products WHERE id = ?", id);

		apiResponse(res).send("Product was succefully deleted", null);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export default {
	add,
	getAll,
	update,
	remove,
};
