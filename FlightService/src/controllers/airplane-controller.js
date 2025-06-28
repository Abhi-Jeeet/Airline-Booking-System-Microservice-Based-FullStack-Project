const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST : /airplane
 * req-body {modelNumber: 'Boeing777', capacity:400}
 */

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    (SuccessResponse.message = "Successfully created an airplane"),
      (SuccessResponse.data = airplane);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    (ErrorResponse.message = "someting went wrong while creating an airplane"),
      (ErrorResponse.error = error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function getAirplane(req, res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function destroyAirplane(req, res){
    try {
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse); 
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirplane(req, res){
  try {
    const airplane = await AirplaneService.updateAirplane(req.params.id, req.body);
    SuccessResponse.data = airplane,
    SuccessResponse.message='Succesfully updated the data'
    return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
}
}


module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
 
};
