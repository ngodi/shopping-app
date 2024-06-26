const express = require("express");
const { getUser, deleteUser, updateUser } = require("../controllers/users.controller");
const authenticateUser = require("../middlewares/authenticateUser");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get("/:id", authenticateUser, getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;