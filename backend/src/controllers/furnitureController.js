const Furniture = require("../models/Furniture");
const Rental = require("../models/Rental");
const path = require("path");

/* ================= CREATE ================= */
exports.createFurniture = async (req, res) => {
  try {
    // Extract image paths from uploaded files
    const imagePaths = req.files && req.files.length > 0
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    // Parse numeric fields
    const rentPerMonth = parseFloat(req.body.rentPerMonth);
    const securityDeposit = parseFloat(req.body.securityDeposit);

    // Create furniture object
    const furnitureData = {
      name: req.body.name,
      category: req.body.category,
      material: req.body.material,
      dimensions: req.body.dimensions || "",
      color: req.body.color || "",
      brand: req.body.brand || "",
      rentPerMonth: rentPerMonth,
      securityDeposit: securityDeposit,
      condition: req.body.condition,
      images: imagePaths,
      listedBy: req.user._id,
      availabilityStatus: "Available"
    };

    const furniture = await Furniture.create(furnitureData);
    res.status(201).json(furniture);
  } catch (error) {
    console.error("Error creating furniture:", error);
    res.status(400).json({ 
      message: "Failed to create furniture", 
      error: error.message 
    });
  }
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
  try {
    const { rentedFrom, rentedTill } = req.body;

    if (!rentedFrom || !rentedTill) {
      return res.status(400).json({ message: "Rental dates are required" });
    }

    const furniture = await Furniture.findById(req.params.id);
    if (!furniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }

    if (furniture.availabilityStatus === "Rented") {
      return res.status(400).json({ message: "Furniture is already rented" });
    }

    // Check if user is trying to rent their own furniture
    if (furniture.listedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot rent your own furniture" });
    }

    const rental = await Rental.create({
      furniture: furniture._id,
      rentedBy: req.user._id,
      rentedFrom,
      rentedTill
    });

    furniture.availabilityStatus = "Rented";
    furniture.rentedBy = req.user._id;
    await furniture.save();

    res.status(201).json(rental);
  } catch (error) {
    console.error("Error renting furniture:", error);
    res.status(400).json({ message: "Failed to rent furniture", error: error.message });
  }
};

/* ================= RETURN ================= */
exports.returnFurniture = async (req, res) => {
  try {
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
    if (furniture) {
      furniture.availabilityStatus = "Available";
      furniture.rentedBy = null;
      await furniture.save();
    }

    res.json({ message: "Furniture returned successfully" });
  } catch (error) {
    console.error("Error returning furniture:", error);
    res.status(400).json({ message: "Failed to return furniture", error: error.message });
  }
};
