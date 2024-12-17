const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/users", userController.allUsers);
router.put("/users/:id", userController.updateUsersRole);

module.exports = router;
