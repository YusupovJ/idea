const throwError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    throw error;
};

export default throwError;
