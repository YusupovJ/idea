import express from "express";
import serverless from "serverless-http";
import router from "../../src/index.js";

const api = express();

api.use("/api", router);

export const handler = serverless(api);
