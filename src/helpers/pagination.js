/* 
    Pagination helper with needed formuls.

    offset - property that returns how many items we skipped
*/

class Pagination {
	constructor(totalItems, currentPage, limit) {
		this.totalItems = totalItems;
		this.currentPage = parseInt(currentPage) || 1;
		this.limit = parseInt(limit) || 15;
		this.offset = (this.currentPage - 1) * this.limit;
		this.totalPages = Math.ceil(this.totalItems / this.limit);
	}
}

export default Pagination;
