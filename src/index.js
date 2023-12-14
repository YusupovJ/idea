import express from "express";
import env from "./config/env.config.js";
import db from "./config/db.config.js";
import authRouter from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";

const app = express();
const port = env.PORT;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRoute);

app.listen(port, async () => {
	await db.connect();

	console.log(`Server was started on port ${port}`);
});
