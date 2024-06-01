const { response } = require('express');
const {BookingService }= require('../services/index')

const bookingService= new BookingService();
const create=async (req, res)=>{
  try {
    const response= await bookingService.createBooking(req.body);
    console.log(response);
    return res.status(200).json({
      success:true,
      data:response,
      message:"successfully booked the flight",
      error:{}
    })
  } catch (error) {
    return res.status(400).json({
      success:false,
      data:{},
      message:" unable to book the flight",
      error:error,
    })
  }
}


module.exports={
  create
}