import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import throwError from "../helpers/throwError.js";

const add = async (req, res) => {
    try {
        const body = req.body;
        const [{ insertId }] = await db.query("INSERT INTO products SET ?", body);
        const [[addedProduct]] = await db.query("SELECT * FROM products WHERE id = ?", insertId);

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
            throwError("This product does not exist", 404);
        }

        const updatedProduct = req.body;

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
            throwError("This product does not exist", 404);
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
