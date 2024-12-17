const status = require("http-status");
const Donation = require("../models/DonationModel");
const DonationTransaction = require("../models/donationTransactionModel");
const response = require("../utils/response");

const createDonationTransaction = async (req, res) => {
  try {
    const { donorId, donationId, amount, message } = req.body;
    console.log(req.body);

    // Check if required fields
    if (!donorId || !donationId || !amount) {
      return res
        .status(status.status.BAD_REQUEST)
        .send(
          response.createErrorResponse(
            status.status.BAD_REQUEST,
            "Missing required fields: donorId, donationId, or amount"
          )
        );
    }
    // Find the donation by ID
    const donation = await Donation.findById(donationId);
    console.log("Donation:", donation);

    if (!donation) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Donation is not found"
          )
        );
    }

    const transaction = new DonationTransaction({
      donorId,
      donationId,
      amount,
      message,
    });
    console.log(transaction);

    const result = await transaction.save();
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
          "Server error occured during creating donation transaction"
        )
      );
  }
};
// // Retrieve all doantion transactions
// const getAllTransactions = async (req, res) => {
//   try {
//     // Define query object for filtering
//     const query = {}; // Fetch all transactions without filtering

//     const transactions = await DonationTransaction.find(query)
//       .populate("donorId") // Populate related User (donor) details
//       .populate("donationId") // Populate related Donation details
//       .sort({ createdAt: -1 }); // Sort transactions in descending order of creation

//     if (transactions.length === 0) {
//       return res
//         .status(status.status.NOT_FOUND)
//         .send(
//           response.createErrorResponse(
//             status.status.NOT_FOUND,
//             "Donation transactions are not found"
//           )
//         );
//     }

//     res
//       .status(status.status.OK)
//       .send(
//         response.createSuccessResponse(
//           status.status.OK,
//           "Donation transactions retrieved successfully",
//           transactions
//         )
//       );
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     res
//       .status(status.status.INTERNAL_SERVER_ERROR)
//       .send(
//         response.createErrorResponse(
//           status.status.INTERNAL_SERVER_ERROR,
//           "Server error occured during retrieving donation transaction"
//         )
//       );
//   }
// };
module.exports = {
  createDonationTransaction,
  // getAllTransactions,
};
