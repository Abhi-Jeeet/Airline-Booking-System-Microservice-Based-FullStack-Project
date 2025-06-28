const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST : /flights
 */

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime:req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    (SuccessResponse.message = "Successfully created an flight"),
      (SuccessResponse.data = flight);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    (ErrorResponse.message = "someting went wrong while creating an flight"),
      (ErrorResponse.error = error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getAllFlights(req, res){
  try {
    const flights = await FlightService.getAllFlights(req.query);
    (SuccessResponse.message = "Successfully fetched the flights"),
      (SuccessResponse.data = flights);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
    
  } catch (error) {
    (ErrorResponse.message = "someting went wrong while fetching the flights"),
      (ErrorResponse.error = error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
async function getFlight(req, res){
  try {
      const flight = await FlightService.getFlight(req.params.id);
      SuccessResponse.data=flight;
      return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse)
  }
}

async function updateSeats(req, res){
  try {
    const flight = await FlightService.updateSeats({
      flightId: req.params.id,
      seats:req.body.seats,
      dec: req.body.dec
    });
    SuccessResponse.data=flight;
      return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse)
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};
