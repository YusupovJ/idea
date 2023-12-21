class MyError {
	constructor(message, status) {
		this.message = message;
		this.status = status;
	}
}

export class BadRequest extends MyError {
	constructor(message) {
		super(message, 400);
		this.message = message;
	}
}

export class Unauthorized extends MyError {
	constructor(message) {
		super(message, 401);
		this.message = message;
	}
}

export class Forbidden extends MyError {
	constructor(message) {
		super(message, 403);
		this.message = message;
	}
}

export class NotFound extends MyError {
	constructor(message) {
		super(message, 404);
		this.message = message;
	}
}
