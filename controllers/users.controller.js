const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler (async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error)
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    res.json({user});
  } catch (error) {
    throw new Error(error)
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({deletedUser});
  } catch (error) {
    throw new Error(error)
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        mobile: req?.body?.mobile,
        email: req?.body?.email,
      },
      { new: true }
    );
    res.json({updatedUser});
  } catch (error) {
    throw new Error(error)
  }
});

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser
};