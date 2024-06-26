const { generateToken } = require("../lib/jsonWebToken");
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
        role: newUser.role,
        token: generateToken(newUser._id)
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

const loginUser = asyncHandler(async(req, res) => {
  try {
    const { email, password } = req.body;
    const authenticatedUser = await User.findOne({email});
   
    if (authenticatedUser && (await authenticatedUser.passwordMatches(password))) {
      const response = {
        _id: authenticatedUser._id,
        firstName: authenticatedUser.firstName,
        lastName: authenticatedUser.lastName,
        email: authenticatedUser.email,
        mobile: authenticatedUser.mobile,
        role: authenticatedUser.role,
        token: generateToken(authenticatedUser._id)
      }
      res.json(response);
    } else {
      throw new Error("User authentication failed");
    }
  } catch(error) {
    throw new Error(error)
  }
});

module.exports = {
  registerUser,
  loginUser,
}