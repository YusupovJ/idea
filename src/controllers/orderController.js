import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { product_id, count } = req.body;
		const { id: user_id } = req;

		const getQuery = "SELECT * FROM products WHERE id = ?";
		const [[product]] = await db.query(getQuery, product_id);

		if (!product) {
			throw new NotFound("Product not found");
		}

		const newOrder = {
			product_id,
			count,
			status: null,
			user_id,
			delivery_id: null,
		};

		const addQuery = "INSERT INTO orders SET ?";
		await db.query(addQuery, newOrder);

		const updateOrdersQuery = "UPDATE products SET orders = orders + 1, count = ? WHERE id = ?";
		await db.query(updateOrdersQuery, [product.count - count, productId]);

		apiResponse(res).send("Order created", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId } = req;
		const { page, limit } = req.query;

		const getTotalItemsQuery = "SELECT COUNT(id) FROM orders WHERE user_id = ?";
		const [[{ "COUNT(id)": totalItems }]] = await db.query(getTotalItemsQuery, userId);

		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = `
            SELECT o.id, o.count AS order_count, o.status AS delivery_status, o.delivery_id, o.created_at, o.updated_at,
            o.product_id, p.name_uz, p.name_ru, p.desc_uz, p.desc_ru, p.desc_short_uz, p.desc_short_ru,
            p.count AS product_count, p.views, p.orders, p.images, p.price, p.discount
            FROM orders AS o
            JOIN products AS p
            ON o.product_id = p.id
            WHERE user_id = ?
            LIMIT ? OFFSET ?
        `;

		const [result] = await db.query(getQuery, [userId, pagination.limit, pagination.offset]);

		// replace "imageUrl,imageUrl" on ["imageUrl", "imageUrl"]
		const orders = result.map((order) => {
			if (order.images) {
				return {
					...order,
					images: order.images.split(","),
				};
			}

			return [];
		});

		apiResponse(res).send(orders, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id: orderId } = req.params;
		const { id: userId } = req;

		const getQuery = "SELECT * FROM orders WHERE id = ? AND user_id = ?";
		const [[order]] = await db.query(getQuery, [orderId, userId]);

		if (!order) {
			throw new NotFound("Order not found");
		}

		const updatedOrder = req.body;

		const updateQuery = "UPDATE orders SET ? WHERE id = ?";
		await db.query(updateQuery, [updatedOrder, orderId]);

		apiResponse(res).send("Order updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id: orderId } = req.params;
		const { id: userId } = req;

		const getQuery = "SELECT * FROM orders WHERE id = ? AND user_id = ?";
		const [[order]] = await db.query(getQuery, [orderId, userId]);

		if (!order) {
			throw new NotFound("Order not found");
		}

		const delQuery = "DELETE FROM orders WHERE id = ?";
		await db.query(delQuery, orderId);

		apiResponse(res).send("Order deleted");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
