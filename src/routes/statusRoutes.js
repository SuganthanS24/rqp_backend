import express from "express";
import { getStatus, getHealth } from "../controllers/statusController.js";

const router = express.Router();

// Health check (placed first to ensure fast response)
router.get("/api/health", getHealth);

// Root path - status dashboard
router.get("/", getStatus);

export default router;
