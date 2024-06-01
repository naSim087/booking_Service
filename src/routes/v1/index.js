const express=require('express')
const router=express.Router();
const {BookingController}= require('../../controllers/index')

router.post('/bookings',BookingController.create);
router.get('/hi',async ()=>{console.log("hello")});
module.exports=router;