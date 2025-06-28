const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST : /airport
 * req-body {name: '', capacity:400}
 */

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address:req.body.address,
      cityId:req.body.cityId
    });
    (SuccessResponse.message = "Successfully created an airport"),
      (SuccessResponse.data = airport);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    (ErrorResponse.message = "someting went wrong while creating an airport"),
      (ErrorResponse.error = error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}

async function getAirport(req, res){
    try {
        const airplane = await AirportService.getAirport(req.params.id);
        SuccessResponse.data=airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function destroyAirport(req, res){
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data=airport;
        return res.status(StatusCodes.OK).json(SuccessResponse); 
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirport(req, res){
  try {
    const airport = await AirportService.updateAirport(req.params.id, req.body);
    SuccessResponse.data = airport,
    SuccessResponse.message='Succesfully updated the data'
    return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
}
}


module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
 
};
