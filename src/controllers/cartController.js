import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { BadRequest, NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { product_id, count } = req.body;
		const { id: user_id } = req;

		const getProductQuery = "SELECT * FROM products WHERE id = ?";
		const [[product]] = await db.query(getProductQuery, product_id);

		if (!product) {
			throw new NotFound("This product does not exist");
		}

		const getCartQuery = "SELECT * FROM cart WHERE product_id = ?";
		const [[cart]] = await db.query(getCartQuery, product_id);

		if (cart) {
			throw new BadRequest("This product already exists in your product");
		}

		const newCart = { product_id, user_id, count };
		const addQuery = "INSERT INTO cart SET ?";
		await db.query(addQuery, newCart);

		apiResponse(res).send("Product successfully added to your cart", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const getTotalItemsQuery = "SELECT COUNT(id) FROM cart WHERE user_id = ?";
		const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery, req.id);

		const { page, limit } = req.query;
		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = `
      SELECT p.id AS productId, c.id AS cartId, p.title, p.description, p.count AS productCount, 
      p.views, p.orders, p.images, p.price, p.discount, c.count AS cartCount, 
      p.created_at, p.updated_at FROM cart AS c
      JOIN products AS p
      ON p.id = c.product_id
      WHERE user_id = ?
      LIMIT ? OFFSET ?
    `;
		const [result] = await db.query(getQuery, [req.id, pagination.limit, pagination.offset]);

		// replace "imageUrl,imageUrl" on ["imageUrl", "imageUrl"]
		const carts = result.map((cart) => {
			if (cart.images) {
				return {
					...cart,
					images: cart.images.split(","),
				};
			}

			return cart;
		});

		apiResponse(res).send(carts, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getOne = async (req, res) => {
	try {
		checkValidation(req);

		const { id: cartId } = req.params;
		const { id: userId } = req;

		const getQuery = `
      SELECT p.id AS productId, c.id AS cartId, p.title, p.description, p.count AS productCount, 
      p.views, p.orders, p.images, p.price, p.discount, c.count AS cartCount, 
      p.created_at, p.updated_at FROM cart AS c
      JOIN products AS p
      ON p.id = c.product_id
      WHERE c.user_id = ?
      AND c.id = ?
    `;
		const [[cart]] = await db.query(getQuery, [userId, cartId]);

		if (!cart) {
			throw new NotFound("Cart not found");
		}

		if (cart.images) {
			cart.images = cart.images.split(",");
		}

		apiResponse(res).send(cart);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId } = req;
		const { id: cartId } = req.params;
		const getQuery = "SELECT * FROM cart WHERE id = ? AND user_id = ?";
		const [[cart]] = await db.query(getQuery, [cartId, userId]);

		if (!cart) {
			throw new NotFound("This product does not exist in your cart");
		}

		const updatedCart = req.body;

		const updateQuery = "UPDATE cart SET ? WHERE id = ?";
		await db.query(updateQuery, [updatedCart, cartId]);

		apiResponse(res).send("Cart updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId } = req;
		const { id: cartId } = req.params;
		const getQuery = "SELECT * FROM cart WHERE id = ? AND user_id = ?";
		const [[cart]] = await db.query(getQuery, [cartId, userId]);

		if (!cart) {
			throw new NotFound("This product does not exist in your cart");
		}

		const delQuery = "DELETE FROM cart WHERE id = ?";
		await db.query(delQuery, cartId);

		apiResponse(res).send("Product was successfully removed from your cart");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
