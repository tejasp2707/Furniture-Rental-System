const Furniture = require("../models/Furniture");
const Rental = require("../models/Rental");

/* ================= USER DASHBOARD ================= */
exports.userDashboard = async (req, res) => {
  const listed = await Furniture.find({
    listedBy: req.user._id
  });

  const rented = await Rental.find({
    rentedBy: req.user._id,
    status: "Active"
  }).populate("furniture");

  const history = await Rental.find({
    rentedBy: req.user._id,
    status: "Completed"
  }).populate("furniture");

  res.json({
    listed,
    rented,
    history
  });
};

/* ================= SYSTEM DASHBOARD ================= */
exports.systemDashboard = async (req, res) => {
  const available = await Furniture.find({
    availabilityStatus: "Available"
  });

  const rented = await Rental.find({
    status: "Active"
  }).populate("furniture rentedBy");

  res.json({
    available,
    rented
  });
};
