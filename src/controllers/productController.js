import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import { BadRequest, NotFound } from "../helpers/errors.js";

const add = async (req, res) => {
    try {
        const createProductDTO = req.body;
        const newProduct = {
            name_uz: createProductDTO.name_uz,
            name_ru: createProductDTO.name_ru,
            desc_uz: createProductDTO.desc_uz,
            desc_ru: createProductDTO.desc_ru,
            desc_short_uz: createProductDTO.desc_short_uz,
            desc_short_ru: createProductDTO.desc_short_ru,
            images: createProductDTO.images,
            price: createProductDTO.price,
            discount: createProductDTO.discount,
        };

        const [{ insertId }] = await db.query("INSERT INTO products SET ?", newProduct);
        const [[addedProduct]] = await db.query("SELECT * FROM products WHERE id = ?", insertId);

        const { categories, events, attributeValues } = createProductDTO;

        if (categories) {
            for (const categoryId of categories) {
                const [[category]] = await db.query("SELECT * FROM categories WHERE id = ?", categoryId);

                if (!category) {
                    throw new BadRequest(`There are no categories with ${categoryId} id`);
                }

                await db.query("INSERT INTO products_categories SET ?", {
                    categories_id: categoryId,
                    products_id: insertId,
                });
            }
        }

        if (events) {
            for (const eventId of events) {
                const [[event]] = await db.query("SELECT * FROM events WHERE id = ?", eventId);

                if (!event) {
                    throw new BadRequest(`There are no events with ${eventId} id`);
                }

                await db.query("INSERT INTO events_products SET ?", {
                    events_id: eventId,
                    products_id: insertId,
                });
            }
        }

        if (attributeValues) {
            for (const attributeValueId of attributeValues) {
                const [[event]] = await db.query("SELECT * FROM attribute_values WHERE id = ?", attributeValueId);

                if (!event) {
                    throw new BadRequest(`There are no attributes with ${attributeValueId} id`);
                }

                await db.query("INSERT INTO attribute_values_products SET ?", {
                    attribute_values_id: attributeValueId,
                    products_id: insertId,
                });
            }
        }

        apiResponse(res).send(addedProduct, null, 201);
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
};

const getAll = async (req, res) => {
    try {
        const [[{ "COUNT(id)": totalItems }]] = await db.query("SELECT COUNT(id) FROM products");

        const { page, limit } = req.query;
        const pagination = new Pagination(totalItems, page, limit);

        const [products] = await db.query("SELECT * FROM products LIMIT ? OFFSET ?", [pagination.limit, pagination.offset]);

        apiResponse(res).send(products, pagination);
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const [[product]] = await db.query("SELECT * FROM products WHERE id = ?", id);

        if (!product) {
            throw new NotFound("This product does not exist");
        }

        const updatedProduct = { ...req.body, updated_at: new Date() };

        await db.query("UPDATE products SET ? WHERE id = ?", [updatedProduct, id]);

        apiResponse(res).send("Product was succefully updated", null, 201);
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
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
        apiResponse(res).error(error.message, error.status);
    }
};

export default {
    add,
    getAll,
    update,
    remove,
};
