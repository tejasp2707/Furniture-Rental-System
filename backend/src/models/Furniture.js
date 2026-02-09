const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Sofa", "Bed", "Table", "Chair", "Wardrobe", "Desk"],
      required: true
    },
    material: {
      type: String,
      enum: ["Wood", "Metal", "Plastic", "Fabric"],
      required: true
    },
    dimensions: { type: String, required: false },
    color: String,
    brand: String,
    rentPerMonth: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    condition: {
      type: String,
      enum: ["New", "Good", "Used"],
      required: true
    },
    availabilityStatus: {
      type: String,
      enum: ["Available", "Rented"],
      default: "Available"
    },
    images: [String],
    listedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rentedFrom: Date,
    rentedTill: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Furniture", furnitureSchema);
