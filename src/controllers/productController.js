import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";

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
        const [products] = await db.query("SELECT * FROM products");

        apiResponse(res).send(products);
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
};

const getOne = async (req, res) => {};

const update = async (req, res) => {};

const remove = async (req, res) => {};

export default {
    add,
    getAll,
    getOne,
    update,
    remove,
};
