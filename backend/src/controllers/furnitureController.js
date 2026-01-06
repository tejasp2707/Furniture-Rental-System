const Furniture = require("../models/Furniture");
const Rental = require("../models/Rental");

/* ================= CREATE ================= */
exports.createFurniture = async (req, res) => {
  const furniture = await Furniture.create({
    ...req.body,
    listedBy: req.user._id
  });
  res.status(201).json(furniture);
};

/* ================= READ ================= */
exports.getAvailableFurniture = async (req, res) => {
  const furniture = await Furniture.find({ availabilityStatus: "Available" });
  res.json(furniture);
};

exports.getFurnitureById = async (req, res) => {
  const furniture = await Furniture.findById(req.params.id);
  if (!furniture) {
    return res.status(404).json({ message: "Furniture not found" });
  }
  res.json(furniture);
};

/* ================= UPDATE ================= */
exports.updateFurniture = async (req, res) => {
  const furniture = await Furniture.findById(req.params.id);

  if (!furniture) {
    return res.status(404).json({ message: "Furniture not found" });
  }

  if (furniture.listedBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  Object.assign(furniture, req.body);
  await furniture.save();

  res.json(furniture);
};

/* ================= DELETE ================= */
exports.deleteFurniture = async (req, res) => {
  const furniture = await Furniture.findById(req.params.id);

  if (!furniture) {
    return res.status(404).json({ message: "Furniture not found" });
  }

  if (furniture.listedBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await furniture.deleteOne();
  res.json({ message: "Furniture removed" });
};

/* ================= RENT ================= */
exports.rentFurniture = async (req, res) => {
  const { rentedFrom, rentedTill } = req.body;

  const furniture = await Furniture.findById(req.params.id);
  if (!furniture || furniture.availabilityStatus === "Rented") {
    return res.status(400).json({ message: "Furniture not available" });
  }

  const rental = await Rental.create({
    furniture: furniture._id,
    rentedBy: req.user._id,
    rentedFrom,
    rentedTill
  });

  furniture.availabilityStatus = "Rented";
  await furniture.save();

  res.status(201).json(rental);
};

/* ================= RETURN ================= */
exports.returnFurniture = async (req, res) => {
  const rental = await Rental.findOne({
    furniture: req.params.id,
    rentedBy: req.user._id,
    status: "Active"
  });

  if (!rental) {
    return res.status(404).json({ message: "Active rental not found" });
  }

  rental.status = "Completed";
  rental.returnedAt = new Date();
  await rental.save();

  const furniture = await Furniture.findById(req.params.id);
  furniture.availabilityStatus = "Available";
  await furniture.save();

  res.json({ message: "Furniture returned successfully" });
};
