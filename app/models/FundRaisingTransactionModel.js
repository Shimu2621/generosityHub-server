const mongoose = require("mongoose");
const { schema } = mongoose;

const fundRaisingTransactionSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Specifies name of the model(User) that this donorId reference which  fetching related user details.
      required: true, // ensures every transaction has a donor.
    },
    fundRaiserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FundRaiser",
      required: true,
    },
    amount: { type: Number, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const FundRaisingTransaction = mongoose.model(
  "FundRaisingTransaction",
  fundRaisingTransactionSchema
);

module.exports = FundRaisingTransaction;
