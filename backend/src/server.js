import app from "./app.js";
import env from "./config/env.js";
import pool from "./config/database.js";

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("Database connected successfully");

    app.listen(env.port, () => {
      console.log(`NexDesk API running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    process.exit(1);
  }
};

startServer();