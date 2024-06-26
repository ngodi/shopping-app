const express = require("express");
const { getUsers, blockUser, unBlockUser } = require("../../controllers/users.controller");
const authenticateUser = require("../../middlewares/authenticateUser");
const isAdmin = require("../../middlewares/isAdmin");
const router = express.Router();

router.get("/", getUsers)
router.put("/block/:id", authenticateUser, isAdmin, blockUser)
router.put("/block/:id", authenticateUser, isAdmin, unBlockUser)

module.exports = router;
