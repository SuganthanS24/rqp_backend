import Quotation from "../models/Quotation.js";
import Product from "../models/Product.js";
import Company from "../models/Company.js";
import BankDetails from "../models/BankDetails.js";
import Terms from "../models/Terms.js";
import TeamMember from "../models/TeamMember.js";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { generateHTMLTemplate } from "../utils/pdfTemplate.js";
import { config } from "../config/env.js";


let browserInstance = null;
const getBrowser = async () => {
  if (!browserInstance || !browserInstance.connected) {
    const args = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ];
    if (process.platform !== "win32") {
      args.push("--no-zygote", "--single-process");
    }
    browserInstance = await puppeteer.launch({
      headless: "new",
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args,
    });
  }
  return browserInstance;
};

const generateQuotationNumber = async () => {
  const count = await Quotation.countDocuments();
  const year = new Date().getFullYear();
  const prefix = config.defaults.quotation.prefix;
  return `${prefix}-${year}-${String(count + 1).padStart(3, "0")}`;
};

export const createQuotation = async (req, res, next) => {
  try {
    const quotationNo = await generateQuotationNumber();

    const quotationData = {
      ...req.body,
      quotationNo,
      createdBy: req.userId,
      pageOrder: [
        { id: "cover", type: "standard", label: "Cover Page" },
        { id: "about", type: "standard", label: "About Us & How It Works" },
        {
          id: "vision",
          type: "standard",
          label: "Vision, Mission & Why Choose Us",
        },
        { id: "pricing", type: "standard", label: "Pricing & Bank Details" },
        { id: "terms", type: "standard", label: "Terms & Conditions" },
        { id: "team", type: "standard", label: "Core Team" },
        { id: "contact", type: "standard", label: "Clients & Contact" },
      ],
    };

    const quotation = await Quotation.create(quotationData);
    res.status(201).json(quotation);
  } catch (error) {
    next(error);
  }
};

export const getAllQuotations = async (req, res, next) => {
  try {
    const quotations = await Quotation.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email")
      .populate("product.productId");

    res.status(200).json(quotations);
  } catch (error) {
    next(error);
  }
};

const getQuery = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { quotationNo: id };
};

export const getQuotationById = async (req, res, next) => {
  try {
    const quotation = await Quotation.findOne(getQuery(req.params.id))
      .populate("createdBy", "name email")
      .populate("product.productId");

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    const company = await Company.findOne();
    const quotationObj = quotation.toObject();
    quotationObj.customPages = company ? company.customPages || [] : [];

    res.status(200).json(quotationObj);
  } catch (error) {
    next(error);
  }
};

export const updateQuotation = async (req, res, next) => {
  try {
    let quotation = await Quotation.findOne(getQuery(req.params.id));

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (req.body.customPages) {
      const company = await Company.findOne();
      if (company) {
        company.customPages = req.body.customPages;
        await company.save();
      }
    }

    quotation = await Quotation.findOneAndUpdate(
      getQuery(req.params.id),
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    const quotationObj = quotation.toObject();
    const company = await Company.findOne();
    quotationObj.customPages = company ? company.customPages || [] : [];

    res.status(200).json(quotationObj);
  } catch (error) {
    next(error);
  }
};

export const getPincode = async (req, res, next) => {
  try {
    const { pincode } = req.params;
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ message: "Error fetching pincode from external API" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pincode", error: error.message });
  }
};

export const deleteQuotation = async (req, res, next) => {
  try {
    const quotation = await Quotation.findOneAndDelete(getQuery(req.params.id));

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.status(200).json({ message: "Quotation deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const downloadPdf = async (req, res, next) => {
  try {
    const quotation = await Quotation.findOne(getQuery(req.params.id));

    if (!quotation || !quotation.pdfUrl) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const relativePath = quotation.pdfUrl.startsWith("/")
      ? quotation.pdfUrl.slice(1)
      : quotation.pdfUrl;
    const filePath = path.join(process.cwd(), relativePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "PDF file not found on server. Please generate it first.",
      });
    }

    res.download(filePath);
  } catch (error) {
    next(error);
  }
};

export const uploadCustomPage = async (req, res, next) => {
  try {
    const quotation = await Quotation.findOne(getQuery(req.params.id));
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const pageId = `custom_${Date.now()}`;

    let company = await Company.findOne();
    if (!company) {
      company = new Company();
    }

    if (!company.customPages) {
      company.customPages = [];
    }

    company.customPages.push({
      id: pageId,
      imageUrl,
      label: req.body.label || "Custom Page",
    });

    await company.save();

    const quotationObj = quotation.toObject();
    quotationObj.customPages = company.customPages;

    res.status(200).json(quotationObj);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updatePageOrder = async (req, res, next) => {
  try {
    const quotation = await Quotation.findOne(getQuery(req.params.id));
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    quotation.pageOrder = req.body.pageOrder;
    await quotation.save();

    const quotationObj = quotation.toObject();
    const company = await Company.findOne();
    quotationObj.customPages = company ? company.customPages || [] : [];

    res.status(200).json(quotationObj);
  } catch (error) {
    next(error);
  }
};

export const generatePdf = async (req, res, next) => {
  try {
    const quotation = await Quotation.findOne(getQuery(req.params.id));

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (quotation.product && quotation.product.productId) {
      const productDoc = await Product.findById(quotation.product.productId);
      if (productDoc && productDoc.productImage) {
        quotation.product.productImage = productDoc.productImage;
      }
    }

    const company = (await Company.findOne()) || config.defaults.company;

    // Helper to convert local file paths to base64 data URIs for Puppeteer
    const getBase64Image = (imagePath) => {
      if (!imagePath) return null;
      if (imagePath.startsWith("http")) return imagePath;
      try {
        const fullPath = path.join(
          process.cwd(),
          imagePath.startsWith("/") ? imagePath.slice(1) : imagePath,
        );
        if (fs.existsSync(fullPath)) {
          const ext = path.extname(fullPath).slice(1) || "png";
          const base64 = fs.readFileSync(fullPath).toString("base64");
          return `data:image/${ext};base64,${base64}`;
        }
      } catch (e) {}
      return imagePath;
    };

    if (company.logo) company.logo = getBase64Image(company.logo);
    if (quotation.product && quotation.product.productImage) {
      quotation.product.productImage = getBase64Image(
        quotation.product.productImage,
      );
    }
    const bankDetails = (await BankDetails.findOne()) || {};
    const terms = (await Terms.findOne()) || { points: [] };
    const team = await TeamMember.find().sort({ order: 1 });

    const processedTeam = team.map((member) => {
      const m = member.toObject();
      if (m.photo) m.photoUrl = getBase64Image(m.photo);
      return m;
    });

    const globalCustomPages = company.customPages || [];

    // Convert quotation to plain object to mutate customPages
    const quotationObj = quotation.toObject();

    if (globalCustomPages.length > 0) {
      quotationObj.customPages = globalCustomPages.map((cp) => {
        const cpObj =
          typeof cp.toObject === "function" ? cp.toObject() : { ...cp };
        if (cpObj.imageUrl) {
          cpObj.imageUrl = getBase64Image(cpObj.imageUrl);
        }
        return cpObj;
      });
    } else {
      quotationObj.customPages = [];
    }

    const dir = path.join(process.cwd(), "uploads", "quotation-pdfs");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileName = `${quotation.quotationNo}.pdf`;
    const filePath = path.join(dir, fileName);

    const bgBase64 = getBase64Image("src/assets/bg.webp");
    const clientImagesBase64 = [];
    for (let i = 1; i <= 16; i++) {
      clientImagesBase64.push(getBase64Image(`src/assets/clients/c${i}.webp`));
    }

    const htmlContent = generateHTMLTemplate(
      quotationObj,
      company,
      bankDetails,
      terms,
      processedTeam,
      {
        bgBase64,
        clientImagesBase64,
      },
    );

    // Return the HTML content directly to the frontend!
    res.send(htmlContent);

  } catch (error) {
    console.error("Error generating HTML for PDF:", error);
    next(error);
  }
};
