import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { BadRequest, NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { productId, count } = req.body;
		const { id: userId } = req;

		const getQuery = "SELECT * FROM products WHERE id = ?";
		const [[product]] = await db.query(getQuery, productId);

		if (!product) {
			throw new NotFound("This product does not exist");
		}

		const newCart = {
			product_id: productId,
			user_id: userId,
			count,
		};
		const addQuery = "INSERT INTO cart SET ?";
		await db.query(addQuery, newCart);

		apiResponse(res).send("Product successfully added to your cart");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const getTotalItemsQuery = "SELECT COUNT(id) FROM cart";
		const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery);

		const { page, limit } = req.query;
		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = `
            SELECT p.id AS productId, c.id AS cartId, p.name_uz, p.name_ru, p.desc_uz, p.desc_ru, 
            p.desc_short_uz, p.desc_short_ru, p.count AS productCount, 
            p.views, p.orders, p.images, p.price, p.discount, c.count AS cartCount, 
            p.created_at, p.updated_at FROM cart AS c
            JOIN products AS p
            ON p.id = c.product_id;
        `;
		const [result] = await db.query(getQuery, [pagination.limit, pagination.offset]);

		// replace "imageUrl,imageUrl" on ["imageUrl", "imageUrl"]
		const carts = result.map((cart) => {
			if (cart.images) {
				return {
					...cart,
					images: cart.images.split(","),
				};
			}

			return [];
		});

		apiResponse(res).send(carts, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id } = req.params;
		const getQuery = "SELECT * FROM cart WHERE id = ?";
		const [[cart]] = await db.query(getQuery, id);

		if (!cart) {
			throw new NotFound("This product does not exist in your cart");
		}

		const delQuery = "DELETE FROM cart WHERE id = ?";
		await db.query(delQuery, id);

		apiResponse(res).send("Product was successfully removed from your cart");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id } = req.params;
		const getQuery = "SELECT * FROM cart WHERE id = ?";
		const [[cart]] = await db.query(getQuery, id);

		if (!cart) {
			throw new NotFound("This product does not exist in your cart");
		}

		const updatedCart = req.body;

		const updateQuery = "UPDATE cart SET ? WHERE id = ?";
		await db.query(updateQuery, [updatedCart, id]);

		apiResponse(res).send("Product was successfully updated");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
