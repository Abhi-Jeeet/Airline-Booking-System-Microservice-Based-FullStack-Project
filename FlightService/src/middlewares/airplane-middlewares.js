const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
function validateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Error while creating an airplane";
    ErrorResponse.error = {
      explanation: "Something went wrong from the client side",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateRequest,
};
