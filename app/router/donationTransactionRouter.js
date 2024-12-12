const express = require("express");
const router = express.Router();
const donationTransactionController = require("../controllers/donationTransactionController");

router.post(
  "/donation-transaction",
  donationTransactionController.createDonationTransaction
);
router.get(
  "/get-transactions",
  donationTransactionController.getAllTransactions
);

module.exports = router;
