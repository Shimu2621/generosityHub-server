const status = require("http-status");

const createSuccessResponse = (statusCode, message, data ) => {
    return {
        status: "Success",
        statusCode,
        message,
        data
        }
}

const createErrorResponse = (statusCode, message, error ) => {
    return {
        status: "Error",
        statusCode,
        message,
        error
    }
}

const createNotFoundResponse = (statusCode, message) => {
   return {
        status: "Error",
        statusCode,
        message,
    }
}

const createUnAuthorizedResponse = (statusCode, message) => {
    return {
        status: "Error",
        statusCode,
        message 
    }
}

module.exports = {
    createErrorResponse,
    createSuccessResponse,
    createNotFoundResponse,
    createUnAuthorizedResponse,
}