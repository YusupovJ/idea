import apiResponse from "../helpers/apiResponse.js";
import checkValidation from "../helpers/checkValidation.js";
import db from "../config/db.config.js";
import { NotFound } from "../helpers/errors.js";
import Pagination from "../helpers/pagination.js";

export const add = async (req, res) => {
	try {
		checkValidation(req);
	} catch (error) {
		apiResponse(res).send(error);
	}
};

export const getAll = async (req, res) => {
	try {
		checkValidation(req);
	} catch (error) {
		apiResponse(res).send(error);
	}
};

export const update = async (req, res) => {
	try {
		checkValidation(req);
	} catch (error) {
		apiResponse(res).send(error);
	}
};

export const remove = async (req, res) => {
	try {
		checkValidation(req);
	} catch (error) {
		apiResponse(res).send(error);
	}
};
