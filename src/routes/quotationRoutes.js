import express from "express";
import {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotation,
  deleteQuotation,
  downloadPdf,
  generatePdf,
  getPincode,
  uploadCustomPage,
  updatePageOrder,
} from "../controllers/quotationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/pincode/:pincode", protect, getPincode);
router.post("/create", protect, createQuotation);
router.get("/", protect, getAllQuotations);
router.get("/:id", protect, getQuotationById);
router.put("/:id", protect, updateQuotation);
router.delete("/:id", protect, deleteQuotation);
router.post("/:id/generate-pdf", protect, generatePdf);
router.get("/:id/download", protect, downloadPdf);
router.post("/:id/pages", [protect, upload.single("customPageImage")], uploadCustomPage);
router.put("/:id/pages/order", protect, updatePageOrder);

export default router;
