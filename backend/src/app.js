import express from "express";
import cors from "cors";
import helmet from "helmet";
import env from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NexDesk API is running",
  });
});

export default app;