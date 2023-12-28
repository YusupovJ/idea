export const paginationQuery = (input) => {
	// is numeric value
	if (isNaN(+input)) return false;

	// is greater than 1 or equal to 1
	if (input < 1) return false;

	return true;
};

export const isUzMobilePhone = (input) => {
	// Right format example: +998901234567
	const regexp = /\+998(90|91|93|94|50|55|88|97|98|95|99|33)[0-9]{7}$/;
	return regexp.test(input);
};
