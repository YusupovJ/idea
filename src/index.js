import express from "express";
import env from "./config/env.config.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

const app = express();
const port = env.PORT;

app.use(express.json());
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/categories", categoryRoute);

app.listen(port, (error) => {
	if (error) {
		return console.log(error);
	}

	console.log(`Server was started on port ${port}`);
});
