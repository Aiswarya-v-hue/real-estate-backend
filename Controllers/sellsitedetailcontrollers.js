const multer = require("multer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const getmodel = require("../Models/sitedetailmodel");

// Ensure upload directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file storage
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const uploadMiddleware = multer({ storage: uploadStorage }).array("images", 10);
const upload = util.promisify(uploadMiddleware); // Convert multer callback to a promise

// Create a new record in the database
const create = async (data) => {
  try {
    const newRecord = await getmodel.create(data);
    return newRecord;
  } catch (error) {
    throw new Error("Error creating record: " + error.message);
  }
};

// Controller method to handle the image upload and create the record
const imageupload = async (req, res) => {
  try {
    await upload(req, res);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedFiles = req.files.map((file) => "/uploads/" + file.filename);
    const { FullName, Address, ContactNumber, EmailAddress, Plot_Size, Property_description } = req.body;

    // Parse Property_Address correctly
    let propertyAddress = req.body.Property_Address;
    if (typeof propertyAddress === "string") {
      try {
        propertyAddress = JSON.parse(propertyAddress);
      } catch (error) {
        return res.status(400).json({ message: "Invalid Property_Address format" });
      }
    }

    if (!propertyAddress?.city || !propertyAddress?.district || !propertyAddress?.state || !propertyAddress?.pincode) {
      return res.status(400).json({ message: "Invalid Property_Address data" });
    }

    const newRecord = new getmodel({
      FullName,
      Address,
      ContactNumber,
      EmailAddress,
      Property_Address: propertyAddress,
      Plot_Size,
      Property_description,
      images: uploadedFiles,
    });

    await newRecord.save();
    res.status(201).json({ message: "Record created successfully", data: newRecord });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update method with validation for Property_Address
const update = async (req, res) => {
  try {
    const { id } = req.params;
    await upload(req, res);

    let uploadedFiles = req.files.map((file) => "/uploads/" + file.filename);

    let propertyAddress = req.body.Property_Address;
    if (typeof propertyAddress === "string") {
      try {
        propertyAddress = JSON.parse(propertyAddress);
      } catch (error) {
        return res.status(400).json({ message: "Invalid Property_Address format" });
      }
    }

    if (!propertyAddress?.city || !propertyAddress?.district || !propertyAddress?.state || !propertyAddress?.pincode) {
      return res.status(400).json({ message: "Invalid Property_Address data" });
    }

    const updateData = {
      FullName: req.body.FullName,
      Address: req.body.Address,
      ContactNumber: req.body.ContactNumber,
      EmailAddress: req.body.EmailAddress,
      Property_Address: propertyAddress,
      Plot_Size: req.body.Plot_Size,
      Property_description: req.body.Property_description,
      images: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      updatedBy: req.body.updatedBy,
    };

    const updatedRecord = await getmodel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Other CRUD methods remain unchanged
const getall = async (req, res) => {
  try {
    const records = await getmodel.find();
    res.status(200).json({ data: records });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ message: "Error fetching records", error: error.message });
  }
};

const getbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await getmodel.findById(id);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching record", error });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await getmodel.findByIdAndDelete(id);
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error });
  }
};

module.exports = { create, update, getall, getbyId, remove, imageupload };
