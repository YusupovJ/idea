import { createConnection } from "mysql2";
import env from "./env.config.js";

const user = env.DB_USER;
const password = env.DB_PASSWORD;
const host = env.DB_HOST;
const database = env.DB_NAME;
const port = env.DB_PORT;

const db = createConnection({ user, password, host, database, port });

export default db.promise();
