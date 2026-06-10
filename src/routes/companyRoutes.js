import express from "express";
import {
  getCompanyDetails,
  updateCompanyDetails,
  getBankDetails,
  updateBankDetails,
  getTerms,
  updateTerms,
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Company details endpoints
router.get("/company", protect, getCompanyDetails);
router.put("/company", [protect, upload.single("logo")], updateCompanyDetails);

// Bank Details endpoints
router.get("/bank-details", protect, getBankDetails);
router.put("/bank-details", protect, updateBankDetails);

// Quotation Terms endpoints
router.get("/terms", protect, getTerms);
router.put("/terms", protect, updateTerms);

// Team Member management endpoints
router.get("/team", protect, getTeamMembers);
router.post("/team", [protect, upload.single("photo")], addTeamMember);
router.put("/team/:id", [protect, upload.single("photo")], updateTeamMember);
router.delete("/team/:id", protect, deleteTeamMember);

export default router;
