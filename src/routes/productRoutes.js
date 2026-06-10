import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", [protect, upload.single("productImage")], createProduct);
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);
router.put("/:id", [protect, upload.single("productImage")], updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
