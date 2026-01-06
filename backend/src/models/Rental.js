const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    furniture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Furniture",
      required: true
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rentedFrom: {
      type: Date,
      required: true
    },
    rentedTill: {
      type: Date,
      required: true
    },
    returnedAt: {
      type: Date
    },
    status: {
      type: String,
      enum: ["Active", "Completed"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rental", rentalSchema);
