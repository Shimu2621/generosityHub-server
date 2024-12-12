const status = require("http-status");
const FundRaisingTransaction = require("../models/FundRaisingTransactionModel");
const FundRaiser = require("../models/FundRaiserModel");
const response = require("../utils/response");

const createTransaction = async (req, res) => {
  try {
    const { donorId, fundRaiserId, amount, message } = req.body;
    const fundRaising = await FundRaiser.findById(fundRaiserId);

    if (!fundRaising) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Fund raising is not found"
          )
        );
    }

    const transaction = new FundRaisingTransaction({
      donorId,
      fundRaiserId,
      amount,
      message,
    });

    await transaction.save();

    fundRaising.raisedAmount += amount;
    const result = await fundRaising.save();

    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New transaction created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during creating fundraiser transaction"
        )
      );
  }
};

// Retrieve all transaction
const getAllTransaction = async (req, res) => {
  try {
    const fRTransaction = await FundRaisingTransaction.find();

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve all fundraisers transaction successfully",
          fRTransaction
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during retrieving all fundraiser transactions",
          error
        )
      );
  }
};

module.exports = {
  createTransaction,
  getAllTransaction,
};
