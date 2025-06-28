const {StatusCodes} = require ('http-status-codes')
const AppError = require("../utils/errors/app-errors");

const {CityRepository} = require("../repositories");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
      const city = await cityRepository.create(data);
      return city;
    } catch (error) {
      if(error.name== 'SequelizeValidationError' || 'SequelizeUniqueConstraintError'){
        let explanation=[];
        error.errors.forEach((err)=>{
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      throw new AppError('Cannot create a new city Object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  async function getCities() {
    try {
      const cities = await cityRepository.getAll();
      return cities;
    } catch (error) {
        throw new AppError('cannot fetch data of all the cities', StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  async function getCity(id) {
    try {
      const city = await cityRepository.get(id);
      return city;
    } catch (error) {
      if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError('The city you requested is not present',error.statusCode);
      }
      throw new AppError('cannot fetch data of  the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
  
  async function destroyCity(id){
      try {
          const response = await cityRepository.destroy(id);
          return response;
      } catch (error) {
          if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError("The city you want to delete is not existed", error.statusCode);
          }
          throw new AppError("cannot fetch the data of the city", StatusCodes.INTERNAL_SERVER_ERROR);
          
      }
  }
  
  async function updateCity(id, data){
    try {
      const response = await cityRepository.update(id, data);
      return response;
    } catch (error) {
      if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError("The city you want to delete is not existed", error.statusCode);
      }
      throw new AppError("cannot fetch the data of the city", StatusCodes.INTERNAL_SERVER_ERROR);
      
  }
  }
  


  module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
  }