const apiResponse = (res) => {
    return {
        send(data, pagination, status = 200) {
            const response = {
                data,
                pagination,
                error: null,
                date: new Date(),
            };

            res.status(status).json(response);
        },

        error(message, status = 500) {
            const response = {
                data: null,
                pagination: null,
                error: message,
                date: new Date(),
            };
        },
    };
};

export default apiResponse;
