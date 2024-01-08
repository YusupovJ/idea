import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { product_id, text, image, rating, answer_to } = req.body;
		const { id: userId } = req;

		const getProductQuery = "SELECT * FROM products WHERE id = ?";
		const [[product]] = await db.query(getProductQuery, product_id);

		if (!product) {
			throw new NotFound("Product not found");
		}

		const newReview = {
			product_id,
			text,
			image,
			rating,
			answer_to: answer_to || null,
			user_id: userId,
		};

		const addQuery = "INSERT INTO reviews SET ?";
		await db.query(addQuery, newReview);

		apiResponse(res).send("Review created", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const { page, limit } = req.query;
		const { id: productId } = req.params;

		const getTotalItemsQuery = `
            SELECT COUNT(r.id)
            FROM reviews AS r
            LEFT JOIN reviews AS ra
            ON ra.answer_to = r.id            
            WHERE r.product_id = ?            
            AND r.answer_to IS NULL
        `;
		const [[{ "COUNT(r.id)": totalItems }]] = await db.query(getTotalItemsQuery, productId);

		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = `
            SELECT 
            r.id AS review_id, r.user_id, u.name, ra.id AS answer_id, r.text AS review_text, 
            ra.text AS answer_text, r.rating, r.image AS review_image,
            ra.image AS answer_image, r.created_at AS review_created_at, 
            r.updated_at AS review_updated_at, ra.created_at AS answer_created_at, 
            ra.updated_at AS answer_updated_at
            FROM reviews AS r
            LEFT JOIN reviews AS ra
            ON ra.answer_to = r.id       
            JOIN users AS u
            ON u.id = r.user_id     
            WHERE r.product_id = ?        
            AND r.answer_to IS NULL
            LIMIT ? OFFSET ?
        `;
		const [reviews] = await db.query(getQuery, [productId, pagination.limit, pagination.offset]);

		apiResponse(res).send(reviews, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getOne = async (req, res) => {
	try {
		checkValidation(req);

		const { id } = req.params;

		const getQuery = `
            SELECT r.id, r.user_id, r.text, r.rating, r.image, u.name, r.created_at, r.updated_at
            FROM reviews AS r
            JOIN users AS u
            ON u.id = r.user_id 
            WHERE r.id = ?
        `;
		const [[review]] = await db.query(getQuery, id);

		if (!review) {
			throw new NotFound("Review not found");
		}

		apiResponse(res).send(review);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId, role } = req;
		const { id: reviewId } = req.params;

		const updatedReview = { ...req.body, updated_at: new Date() };

		if (role === "moderator" || role === "admin") {
			const getQuery = "SELECT * FROM reviews WHERE id = ?";
			const [[review]] = await db.query(getQuery, reviewId);

			if (!review) {
				throw new NotFound("Review not found");
			}

			const updateQuery = "UPDATE reviews SET ? WHERE id = ?";
			await db.query(updateQuery, [updatedReview, reviewId]);
		} else if (role === "user") {
			const getQuery = "SELECT * FROM reviews WHERE id = ? AND user_id = ?";
			const [[review]] = await db.query(getQuery, [reviewId, userId]);

			if (!review) {
				throw new NotFound("Review not found");
			}

			const updateQuery = "UPDATE reviews SET ? WHERE id = ? AND user_id = ?";
			await db.query(updateQuery, [updatedReview, reviewId, userId]);
		}

		apiResponse(res).send("Review updated", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId, role } = req;
		const { id: reviewId } = req.params;

		if (role === "moderator" || role === "admin") {
			const getQuery = "SELECT * FROM reviews WHERE id = ?";
			const [[review]] = await db.query(getQuery, reviewId);

			if (!review) {
				throw new NotFound("Review does not exist");
			}

			const delQuery = "DELETE FROM reviews WHERE id = ?";
			await db.query(delQuery, reviewId);
		} else if (role === "user") {
			const getQuery = "SELECT * FROM reviews WHERE id = ? AND user_id = ?";
			const [[review]] = await db.query(getQuery, [reviewId, userId]);

			if (!review) {
				throw new NotFound("Review does not exist");
			}

			const delQuery = "DELETE FROM reviews WHERE id = ? AND user_id = ?";
			await db.query(delQuery, [reviewId, userId]);
		}

		apiResponse(res).send("Review removed");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
