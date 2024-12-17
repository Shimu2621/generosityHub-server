const status = require("http-status");
const DonationTransaction = require("../models/donationTransactionModel");
const FundRaisingTransaction = require("../models/FundRaisingTransactionModel");
const response = require("../utils/response");

const allTransaction = async (req, res) => {
  try {
    const allDonationTransactions = await DonationTransaction.find()
      .populate("donorId", "userName email")
      .populate("donationId", "title amount category");

    const allFRTransaction = await FundRaisingTransaction.find()
      .populate("donorId", "userName email")
      .populate("fundRaiserId", "title amount category");

    const result = [...allDonationTransactions, ...allFRTransaction];
    console.log(result);

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "All transactions retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during creating donation transaction"
        )
      );
    console.log(error);
  }
};

// Retrieving transaction by user id
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.params);

    const allDonationTransactions = await DonationTransaction.find({
      donorId: id,
    })
      .populate("donorId", "userName email")
      .populate("donationId", "title amount category");

    const allFRTransaction = await FundRaisingTransaction.find({ donorId: id })
      .populate("donorId")
      .populate("fundRaiserId");

    const result = [...allDonationTransactions, ...allFRTransaction];

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "All transactions retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during creating donation transaction",
          error
        )
      );
    console.log(error);
  }
};

module.exports = {
  allTransaction,
  getTransactionById,
};
