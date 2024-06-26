const express = require("express");
const { getUser, deleteUser, updateUser } = require("../controllers/users.controller");
const router = express.Router();

router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;