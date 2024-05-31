const {Booking}= require('../models/index');

class BookingRepository{
  async create(data){
    try{
        const data= await Booking.create(data);
        return data;
    }
    catch(error){
      console.log("something went wrong at the repolayer ");
      throw error;
    }
  }





}
module.exports=BookingRepository