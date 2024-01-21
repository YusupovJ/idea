import express, { Router } from "express";
import env from "./config/env.config.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import eventRoute from "./routes/eventRoute.js";
import favouriteRoute from "./routes/favouriteRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import orderRoute from "./routes/orderRoute.js";
import deliveryRoute from "./routes/deliveryRoute.js";
import attributeRoute from "./routes/attributeRoute.js";

const app = express();
const port = env.PORT;
const router = Router();

router.use(express.json());
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/events", eventRoute);
router.use("/favourites", favouriteRoute);
router.use("/cart", cartRoute);
router.use("/address", addressRoute);
router.use("/reviews", reviewRoute);
router.use("/orders", orderRoute);
router.use("/delivery", deliveryRoute);
router.use("/attributes", attributeRoute);

app.use("/api", router);

app.listen(port, (error) => {
	if (error) {
		console.log("Hello world!");
		return;
	}
	console.log(`Server was started on port ${port}`);
});
