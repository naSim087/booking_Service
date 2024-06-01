const { BookingRepository } = require('../repository/index');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/server-config');

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  createBooking = async (data) => {
    
      const flightId = data.flightId;
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;
      if(data.noofSeats > flightData.totalSeats) {
          throw {error:"insuff"};
      }
      const totalCost = priceOfTheFlight * data.noofSeats;
      const bookingPayload = {...data, totalCost};
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      try{
      await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noofSeats});
      }
      catch(error){
        const finalBooking = await this.bookingRepository.updateBooking(booking.id, {status: "Booked"});
       
        return  finalBooking;
    }
      
       

    
  }
}

module.exports = BookingService;
