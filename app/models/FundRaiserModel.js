const mongoose = require("mongoose");
const { schema } = mongoose;

const fundRaiserSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    targetedAmount: { type: Number, required: true },
    raisedAmount: { type: Number, required: true },
    daysLeft: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["active", "completed"], default: "active" },
  },
  {
    timestamps: true,
  }
);

const FundRaiser = mongoose.model("FundRaiser", fundRaiserSchema);

module.exports = FundRaiser;
