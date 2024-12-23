const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/users", userController.allUsers);
router.put("/users/:id", userController.updateUsersRole);
router.get("/get-user/:id", userController.getUserById);
router.put("/users/:id", userController.updateProfile);

module.exports = router;
