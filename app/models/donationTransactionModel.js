const mongoose = require("mongoose");
const { schema } = mongoose;

const donationTransactionSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Specifies name of the model(User) that this donorId reference which  fetching related user details.
      required: true, // ensures every transaction has a donor.
    },
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    amount: { type: Number, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const DonationTransaction = mongoose.model(
  "DonationTransaction",
  donationTransactionSchema
);

module.exports = DonationTransaction;
