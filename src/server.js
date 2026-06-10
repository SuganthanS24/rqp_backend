import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import errorHandler from "./middleware/errorMiddleware.js";
import { logger } from "./utils/logger.js";

// Routes
import statusRoutes from "./routes/statusRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Status and Health Routes (must be loaded first)
app.use(statusRoutes);

// Protected API Routes
app.use("/api/auth", authRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/products", productRoutes);
app.use("/api", companyRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});
