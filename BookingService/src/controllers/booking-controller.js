const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const inMemDb={};


async function createBooking(req, res) {
  try {
    const booking = await BookingService.createBooking({
      flightId: req.body.flightId,
      noOfSeats: req.body.noOfSeats,
      userId: req.body.userId,
    });
    (SuccessResponse.message = "Successfully created an booking"),
      (SuccessResponse.data = booking);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    (ErrorResponse.message = "someting went wrong while creating an booking"),
      (ErrorResponse.error = error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function makePayment(req, res) {
  try {
    const idempotencyKey = req.headers['x-idempotency-key'];
    if(!idempotencyKey){
      return res.status(StatusCodes.BAD_REQUEST).json({message:"Idempotency key is missing"})
    }
    if(inMemDb[idempotencyKey]){
      return res.status(StatusCodes.BAD_REQUEST).json({message:'Cannot retry on a successfull payment'})
    }
    const booking = await BookingService.makePayment({
      totalCost: req.body.totalCost,
      userId: req.body.userId,
      bookingId: req.body.bookingId,
    });
    inMemDb[idempotencyKey] = idempotencyKey;
    (SuccessResponse.message = "Successfully created an booking"),
      (SuccessResponse.data = booking);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    (ErrorResponse.message = "someting went wrong while creating an booking"),
      (ErrorResponse.error = error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}


module.exports={
    createBooking,
    makePayment
}