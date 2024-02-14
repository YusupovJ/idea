import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { BadRequest, NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { product_id } = req.body;
		const { id: user_id } = req;

		const getQuery = "SELECT * FROM favourites WHERE product_id = ?";
		const [[favourite]] = await db.query(getQuery, product_id);

		if (favourite) {
			throw new BadRequest("You've already added this product to favourites");
		}

		const newFavourite = { product_id, user_id, isFav: "true" };

		const addQuery = "INSERT INTO favourites SET ?";
		await db.query(addQuery, newFavourite);

		apiResponse(res).send("Added to favourite", null, 201);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const { id: userId } = req;

		const getTotalItemsQuery = "SELECT COUNT(*) FROM favourites WHERE user_id = ?";
		const [[{ "COUNT(*)": totalItems }]] = await db.query(getTotalItemsQuery, userId);

		const { page, limit } = req.query;
		const pagination = new Pagination(totalItems, page, limit);

		const getQuery = `
      SELECT * FROM favourites AS up
      JOIN products AS p
      ON p.id = up.product_id
      WHERE up.user_id = ?
      LIMIT ? OFFSET ?
    `;
		const [result] = await db.query(getQuery, [userId, pagination.limit, pagination.offset]);

		// replace "imageUrl,imageUrl" on ["imageUrl", "imageUrl"]
		const favourites = result.map((favourite) => {
			if (favourite.images) {
				delete favourite.product_id;
				delete favourite.user_id;

				return {
					...favourite,
					images: favourite.images.split(","),
				};
			}

			return favourite;
		});

		apiResponse(res).send(favourites, pagination);
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);

		const { id: productId } = req.params;
		const { id: userId } = req;

		const getQuery = `
      SELECT * FROM favourites
      WHERE product_id = ?
      AND user_id = ?
    `;
		const [[favourite]] = await db.query(getQuery, [productId, userId]);

		if (!favourite) {
			throw new NotFound("Favourite not found");
		}

		const delQuery = `
      DELETE FROM favourites
      WHERE product_id = ?
      AND user_id = ?
    `;
		await db.query(delQuery, [productId, userId]);

		apiResponse(res).send("Product removed from favourites");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
