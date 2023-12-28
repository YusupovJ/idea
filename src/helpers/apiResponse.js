/* 
    Function for sending responses to the client.
    Method send is for success data.
    Method throw is for failed data. 
*/

const apiResponse = (res) => {
	return {
		send(data, pagination = null, status = 200) {
			const response = {
				data,
				pagination,
				error: null,
				validationErrors: [],
				date: new Date(),
			};

			res.status(status).json(response);
		},

		throw(error) {
			const response = {
				data: null,
				pagination: null,
				error: error.message,
				validationErrors: error.validationErrors || [],
				date: new Date(),
			};

			res.status(error.status || 500).json(response);
		},
	};
};

export default apiResponse;
