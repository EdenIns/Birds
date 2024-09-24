const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/UserController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/getUserConnected", auth, userController.getUserConnected);
router.put("/:id", auth, userController.updateUserProfil);

module.exports = router;
