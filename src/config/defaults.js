export const defaults = {
  company: {
    companyName: process.env.DEFAULT_COMPANY_NAME || "Robomiracle Technologies Private Limited",
    address: process.env.DEFAULT_COMPANY_ADDRESS || "Coimbatore, Tamil Nadu",
    email: process.env.DEFAULT_COMPANY_EMAIL || "sales@robomiracle.com",
    phone: process.env.DEFAULT_COMPANY_PHONE || "63794 38840",
    about: process.env.DEFAULT_COMPANY_ABOUT || "We specialize in delivering innovative robotic solutions.",
    vision: process.env.DEFAULT_COMPANY_VISION || "To be a trusted partner for organizations looking to embrace the future of robotics.",
    customPages: [],
    mission: process.env.DEFAULT_COMPANY_MISSION || "To deliver innovative and accessible robotic solutions that empower businesses.",
    howItWorks: process.env.DEFAULT_COMPANY_HOW_IT_WORKS || "Our process begins with understanding your unique challenges and goals.",
    whyChooseUs: process.env.DEFAULT_COMPANY_WHY_CHOOSE_US || "We combine innovation, expertise, and customer-centricity.",
  },
  bank: {
    accountName: process.env.DEFAULT_BANK_ACCOUNT_NAME || "Robomiracle Technologies Private Limited",
    accountNo: process.env.DEFAULT_BANK_ACCOUNT_NO || "9009999909",
    ifscCode: process.env.DEFAULT_BANK_IFSC_CODE || "KKBK0008666",
    bankName: process.env.DEFAULT_BANK_NAME || "KOTAK MAHINDRA BANK",
    branch: process.env.DEFAULT_BANK_BRANCH || "COIMBATORE",
  },
  terms: {
    title: process.env.DEFAULT_TERMS_TITLE || "Default Quotation Terms",
    points: [
      {
        heading: "Quotation Acceptance",
        description: "Once accepted by email or signature, the order is final and binding.",
      },
      {
        heading: "Cancellation",
        description: "Orders cannot be cancelled after acceptance.",
      },
    ],
  },
  quotation: {
    prefix: process.env.QUOTATION_NUMBER_PREFIX || "RM-QTN",
  }
};
