const status = require("http-status");
const response = require("../utils/response");
const FundRaiser = require("../models/FundRaiserModel");

// Create a new fundraiser
const createFundRaiser = async (req, res) => {
  try {
    const newFundRaiser = new FundRaiser(req.body);
    const result = await newFundRaiser.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New fundraiser created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the new fundraiser creation",
          error
        )
      );
  }
};

// Retrieve all fundraisers
const getAllFundRaiser = async (req, res) => {
  try {
    const fundRaisers = await FundRaiser.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieve all fundraisers successfully",
          fundRaisers
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during retrieving all fundraisers",
          error
        )
      );
  }
};

// Retrieving a single fundraiser by id
const getSingleFundRaiserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FundRaiser.findById(id);
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
          "Retrieve a single fundraiser successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during retrieving a single fundraiser"
        )
      );
  }
};

// Update a fundraiser by id
const updateFundRaiserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFundraiser = req.body;

    const result = await FundRaiser.findByIdAndUpdate(id, updatedFundraiser, {
      new: true,
    });
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Fundraiser not updated"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Updated a single fundraiser successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during updating a single fundraiser"
        )
      );
  }
};

// Delete a single fundraiser by id
const deleteFundraiser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FundRaiser.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "Fundraiser not deleted"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Deleted a single fundraiser successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during deleting a single fundraiser"
        )
      );
  }
};
module.exports = {
  createFundRaiser,
  getAllFundRaiser,
  getSingleFundRaiserById,
  updateFundRaiserById,
  deleteFundraiser,
};
