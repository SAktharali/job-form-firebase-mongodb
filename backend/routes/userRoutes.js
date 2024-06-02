const express = require('express');
const { userController,upload } = require('../controllers/userControllers');

const router = express.Router();
// Define the route with multer middleware
router.post('/register', upload
   , userController);
//login
 // send-otp
// router.post('/send-otp', sendOtp);

// verify-otp
// router.post('/verify-otp', verifyOtp);
module.exports = router;
