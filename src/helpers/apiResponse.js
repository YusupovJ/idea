const apiResponse = (res) => {
	return {
		send(data, pagination = null, status = 200) {
			const response = {
				data,
				pagination,
				errors: null,
				date: new Date(),
			};

			res.status(status).json(response);
		},

		error(message, status = 500) {
			const response = {
				data: null,
				pagination: null,
				errors: message,
				date: new Date(),
			};

			res.status(status).json(response);
		},
	};
};

export default apiResponse;
