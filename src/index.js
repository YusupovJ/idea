import express from "express";
import env from "./config/env.config.js";
import router from "./routes/rootRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.listen(port, (error) => {
	if (error) {
		console.log("Hello world!");
		return;
	}
	console.log(`Server was started on port ${port}`);
});
