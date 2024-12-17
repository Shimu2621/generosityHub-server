const express = require("express");
const router = express.Router();
const allTransactionController = require("../controllers/allTransactionController");

router.get("/all-transactions", allTransactionController.allTransaction);
router.get("/allTransaction/:id", allTransactionController.getTransactionById);

module.exports = router;
