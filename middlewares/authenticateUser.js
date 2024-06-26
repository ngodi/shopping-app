const { decodeToken } = require("../lib/jsonWebToken");
const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");

const authenticateUser = asyncHandler (async (req, res, next) => {
  const authHeaders = req?.headers?.authorization;

  let token;
  if (authHeaders?.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
    try {
      if (token) {
        const decodedUser = decodeToken(token);
        const user = await User.findById(decodedUser?.id);
        req.user = user;
        next();
      }
    } catch(error) {
      throw new Error("Unauthorized");
    }
  } else {
    throw new Error("Unauthorized");
  }
});

module.exports = authenticateUser;