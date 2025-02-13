const { Schema, model } = require('mongoose');

const sampleschema = new Schema(
  {
    FullName: { type: String },
    Address: { type: String },
    ContactNumber: { type: Number },
    EmailAddress: { type: String },
    Property_Address: {
      city: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
    Plot_Size: { type: String },
    images: [{ type: String, required: false }], // Array to store multiple image URLs
    Property_description: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true } // Enable timestamps
);

module.exports = model('sitedetails', sampleschema);
