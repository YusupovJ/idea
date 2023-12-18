class Pagination {
    constructor(totalItems, currentPage = 1, limit = 10) {
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.limit = limit;
        this.offset = (this.currentPage - 1) * this.limit;
    }
}

export default Pagination;
