import express from "express";
import env from "./config/env.config.js";
import db from "./config/db.config.js";

const app = express();
const port = env.PORT;

app.use(express.json());

app.listen(port, async () => {
	await db.connect();

	console.log(`Server was started on port ${port}`);
});
