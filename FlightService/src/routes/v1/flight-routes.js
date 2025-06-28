const express = require("express");
const {FlightMiddlewares} = require("../../middlewares")

const {FlightController} = require("../../controllers")

const router = express.Router();

// /api/v1/flights POST
router.post('/', FlightMiddlewares.validateRequest,FlightController.createFlight);

// /api/v1/flights?trips=IXR-PAT GET
router.get('/', FlightController.getAllFlights);

// /api/v1/flights/:id
router.get('/:id', FlightController.getFlight);

// /api/v1/flights/:id/seats PATCH
router.patch('/:id/seats', FlightMiddlewares.validateSeatsRequest, FlightController.updateSeats)

module.exports=router