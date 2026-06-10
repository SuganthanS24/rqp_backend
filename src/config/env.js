import dotenv from "dotenv";
import { defaults } from "./defaults.js";

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongodbUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/robomiracle",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key",
  jwtExpire: process.env.JWT_EXPIRE || "7d",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  uploadSizeLimit: parseInt(process.env.UPLOAD_SIZE_LIMIT) || 5 * 1024 * 1024, // 5MB default
  allowedMimetypes: (process.env.ALLOWED_MIMETYPES || "image/jpeg,image/png,image/gif,image/webp").split(","),
  defaults,
};

