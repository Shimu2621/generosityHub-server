const Donation = require("../models/DonationModel");
const status = require("http-status");
const response = require("../utils/response");

// Create a new donation
const createDonation = async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    const result = await newDonation.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New donation created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the new donation creation",
          error
        )
      );
  }
};

// Retrieve all donations
const getAllDonations = async (req, res) => {
  // console.log(req.query);
  const { search, sort } = req.query;
  console.log(search);

  let filter = {};
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  let sortingAmount = {};
  if (sort === "HighToLow") {
    sortingAmount.amount = -1;
  }

  if (sort === "LowToHigh") {
    sortingAmount.amount = 1;
  }
  try {
    const donations = await Donation.find(filter).sort(sortingAmount);
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving all donation successfully",
          donations
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving all donation",
          error.message
        )
      );
  }
};

// Retrieve a single donation
const getSingleDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Donation.findById(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Donation not found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving a single donation successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving a single donation",
          error
        )
      );
  }
};

// Update a donation by id
const updateSingleDonation = async (req, res) => {
  const { id } = req.params;
  const updatedDonation = req.body;

  try {
    const result = await Donation.findByIdAndUpdate(id, updatedDonation, {
      new: true,
    });

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Donation not updated"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Donation updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the update a songle donation",
          error
        )
      );
  }
};

// Delete a donation by id
const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Donation.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Donation not updated"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Donation deleted successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the update a songle donation",
          error
        )
      );
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getSingleDonationById,
  updateSingleDonation,
  deleteDonation,
};
