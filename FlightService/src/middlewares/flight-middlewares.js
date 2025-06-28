const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
function validateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalSeats) {
    ErrorResponse.message = "Error while creating an flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateSeatsRequest(req, res, next){
  if (!req.body.seats) {
    ErrorResponse.message = "Error while updating flight";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}


module.exports = {
  validateRequest,
  validateSeatsRequest
};
