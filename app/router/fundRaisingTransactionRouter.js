const express = require("express");
const router = express.Router();
const fundRaisingTransactionController = require("../controllers/fundRaisingTransactionController");

router.post(
  "/create-transaction",
  fundRaisingTransactionController.createTransaction
);
// router.get(
//   "/fRTransactions",
//   fundRaisingTransactionController.getAllTransaction
// );

module.exports = router;
