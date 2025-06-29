const User = require("../models/UserModel");
const status = require("http-status");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/token");
require("dotenv").config();
const response = require("../utils/response");

// Signup route function
const signup = async (req, res) => {
  try {
    const { userName, email, password, userPhoto, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(status.status.BAD_REQUEST)
        .send(
          response.createErrorResponse(
            status.status.BAD_REQUEST,
            "Email already in use",
            "A user with this email already exists"
          )
        );
    }

    // Create and save the new user
    const newUser = new User({ userName, email, password, userPhoto, role });
    const result = await newUser.save();

    // Send success response
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "User created successfully",
          result
        )
      );
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occurred when creating a user",
          error.message
        )
      );
  }
};

// Signin route function
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(status.status.UNAUTHORIZED)
        .send(
          response.createUnAuthorizedResponse(
            status.status.UNAUTHORIZED,
            "Credential is not matched"
          )
        );
    }

    const token = generateToken(user);
    console.log("token", token);

    res.cookie("accessToken", token, {
      httpOnly: false,
      sameSite: "Lax",
      // domain: "localhost",
      maxAge: 60 * 60 * 1000,
    });
    // Check user role
    const isAdmin = user.role === "admin";
    console.log("isAdmin", isAdmin);
    res.status(status.status.OK).send(
      response.createSuccessResponse(
        status.status.OK,
        "User logged in successfully",
        user,
        isAdmin,
        token
      ) //include isAdmin in response
    );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured when creating an user",
          error.message
        )
      );
  }
};

// Retrieving all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving all users successfully",
          users
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving all users",
          error.message
        )
      );
  }
};

// Update the user role by id
const updateUsersRole = async (req, res) => {
  const { id } = req.params;
  const updatedRole = req.body;
  // console.log(updatedRole);
  try {
    const result = await User.findByIdAndUpdate(id, updatedRole, { new: true });
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "User role not updated"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "User role updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the update users role",
          error
        )
      );
  }
};

// Retrieve user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Retrieving a Single User Successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the retrieving a single user",
          error
        )
      );
  }
};

// Update User profile
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updatedProfile = req.body;

  try {
    const result = await User.findByIdAndUpdate(id, updatedProfile, {
      new: true,
    });
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createNotFoundResponse(
            status.status.NOT_FOUND,
            "User profile not updated"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "User profile updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Server error occured during the update users role",
          error
        )
      );
  }
};

module.exports = {
  signup,
  signin,
  allUsers,
  updateUsersRole,
  getUserById,
  updateProfile,
};
