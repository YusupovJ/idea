import { Router } from "express";
import authRoute from "./authRoute.js";
import productRoute from "./productRoute.js";
import userRoute from "./userRoute.js";
import categoryRoute from "./categoryRoute.js";
import eventRoute from "./eventRoute.js";
import favouriteRoute from "./favouriteRoute.js";
import cartRoute from "./cartRoute.js";
import addressRoute from "./addressRoute.js";
import orderRoute from "./orderRoute.js";
import deliveryRoute from "./deliveryRoute.js";
import attributeRoute from "./attributeRoute.js";

const router = Router();

router.get("/", (req, res) => {
	res.send("<h1>Hello men!</h1>");
});

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/events", eventRoute);
router.use("/favourites", favouriteRoute);
router.use("/cart", cartRoute);
router.use("/address", addressRoute);
router.use("/orders", orderRoute);
router.use("/delivery", deliveryRoute);
router.use("/attributes", attributeRoute);

export default router;
