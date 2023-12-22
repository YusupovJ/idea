import apiResponse from "../helpers/apiResponse.js";
import db from "../config/db.config.js";
import Pagination from "../helpers/pagination.js";
import { Forbidden, NotFound } from "../helpers/errors.js";
import crypt from "../helpers/hash.js";

const getAll = async (req, res) => {
    try {
        const [[{ "COUNT(id)": totalItems }]] = await db.query("SELECT COUNT(id) FROM users");

        const { page, limit } = req.query;
        const pagination = new Pagination(totalItems, page, limit);

        const [users] = await db.query("SELECT * FROM users LIMIT ? OFFSET ?", [pagination.limit, pagination.offset]);

        apiResponse(res).send(users, pagination);
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
};

const update = async (req, res) => {
    try {
        const { id, role } = req;
        const paramsId = parseInt(req.params.id);
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", paramsId);

        if (!user) {
            throw new NotFound("This user does not exist");
        }

        if (role === "moderator" || (role === "user" && id === paramsId)) {
            const { body } = req;
            const updatedUser = { ...body, updated_at: new Date() };

            if (updatedUser.password) {
                const newHashedPassword = crypt.hash(updatedUser.password);

                updatedUser.password = newHashedPassword;
            }

            await db.query("UPDATE users SET ? WHERE id = ?", [updatedUser, paramsId]);

            return apiResponse(res).send("User was successfully updated", null, 201);
        }

        throw new Forbidden("You cannot update this account");
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
};

const remove = async (req, res) => {
    try {
        const { id, role } = req;
        const paramsId = parseInt(req.params.id);
        const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", paramsId);

        if (!user) {
            throw new NotFound("This user does not exist");
        }

        if (role === "moderator" || (role === "user" && id === paramsId)) {
            await db.query("DELETE FROM users WHERE id = ?", paramsId);

            return apiResponse(res).send("You successfully deleted this account");
        }

        throw new Forbidden("You cannot delete this account");
    } catch (error) {
        apiResponse(res).error(error.message, error.status);
    }
};

export default {
    getAll,
    update,
    remove,
};
