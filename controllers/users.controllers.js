const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler( async(req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({email}, '-password');

    if (!existingUser) {
      const newUser = await User.create(req.body);

      const response = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role
      }
    
      res.json(response);
    } else {
      res.json(
        { message: "User already exists",
          status: false
        }
      );
    }
    
  } catch(error) {
    throw new Error(error)
  }
});

module.exports = {
  registerUser,
}