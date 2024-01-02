import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { BadRequest, NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);

		const { productId } = req.body;
		const { id: userId } = req;

		const [[favourite]] = await db.query("SELECT * FROM users_products WHERE products_id = ?", productId);

		if (favourite) {
			throw new BadRequest("You've already added this product to favourites");
		}

		const newFavourite = {
			products_id: productId,
			users_id: userId,
		};

		await db.query("INSERT INTO users_products SET ?", newFavourite);

		apiResponse(res).send("You successfully added product to favourites");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);

		const { page, limit } = req.query;
		const [[{ "COUNT(*)": totalItems }]] = await db.query("SELECT COUNT(*) FROM users_products WHERE users_id = ?", req.id);
		const pagination = new Pagination(totalItems, page, limit);

		const sqlQuery = `
                SELECT * FROM users_products AS up
                JOIN products AS p
                ON p.id = up.products_id
                WHERE up.users_id = ?
                LIMIT ? OFFSET ? 
            `;
		const [result] = await db.query(sqlQuery, [req.id, pagination.limit, pagination.offset]);

		// replace "imageUrl,imageUrl" on ["imageUrl", "imageUrl"]
		const favourites = result.map((favourite) => {
			if (favourite.images) {
				delete favourite.products_id;
				delete favourite.users_id;

				return {
					...favourite,
					images: favourite.images.split(","),
				};
			}

			return [];
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
            SELECT * FROM users_products
            WHERE products_id = ?
            AND users_id = ?
        `;
		const [[favourite]] = await db.query(getQuery, [productId, userId]);

		if (!favourite) {
			throw new NotFound("This favourite product does not exist");
		}

		const delQuery = `
            DELETE FROM users_products
            WHERE products_id = ?
            AND users_id = ?
        `;
		await db.query(delQuery, [productId, userId]);

		apiResponse(res).send("Product was successfully removed from favourites");
	} catch (error) {
		apiResponse(res).throw(error);
	}
};
