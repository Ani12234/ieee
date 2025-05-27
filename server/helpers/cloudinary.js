const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config(); // Ensure dotenv is loaded here as well

// Debug environment variables
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "[API KEY SET]" : "[MISSING]",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "[API SECRET SET]" : "[MISSING]"
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dxqaubach",
  api_key: process.env.CLOUDINARY_API_KEY || "934128494338136",
  api_secret: process.env.CLOUDINARY_API_SECRET || "gWg8WtJRI87_IdjqB6pEiVQ-Pxc",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
