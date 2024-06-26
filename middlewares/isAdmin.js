const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email });

  if (adminUser.role !== "admin") {
    throw new Error("not allowed");
  } else {
    next();
  }
});

module.exports = isAdmin;