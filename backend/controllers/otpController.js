const otpModel=require('../models/otpModel')
const otpGenerator=require('otp-generator') 
const twilio=require('twilio')
const dotenv=require('dotenv');
dotenv.config();
const accountSid=process.env.TWILIO_ACCOUNT_SID
const authToken=process.env.TWILIO_AUTH_TOKEN



// const twilioClient=new twilio(accountSid,authToken);
const sendOtp = async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        throw new Error('Phone number is required');
      }
      const otp = otpGenerator.generate(6,
 { 
    upperCaseAlphabets: false,
     specialChars: false,
      lowerCaseAlphabets: false 
    }
);
  
     const currentDate=new Date();

    const otpExpiration = new Date(currentDate.getTime() + 10 * 60000); // Set expiration time to 10 minutes from now
 const updateResult=    await otpModel.findOneAndUpdate({
      phoneNumber:phoneNumber,
      otp:otp,
    //   otpExpiration:new Date(currentDate.getTime())
    otpExpiration:otpExpiration
         },
       {
upsert:true,
new:true,
setDefaultOnInsert:true
         }  )
         console.log('Update Result:', updateResult);
         if (!updateResult) {
            throw new Error('Failed to save OTP');
          }
        //  await twilioClient.messages.create({
        //   body:`your otp is: ${otp}`,
        //   to:phoneNumber,
        //   from:process.env.TWILIO_PHONE_NUMBER
        //  })
      res.status(200).json({
        success: true,
        // message: otp
        message: 'otp sent successfully'+ otp
      });
    } catch (error) {
        console.log("error:",error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

//   const verifyOtp = async (req, res) => {
//     try {
//       const { phoneNumber, userOtp } = req.body;
  
//       const otpDoc = await otpModel.findOne({ phoneNumber, otp: userOtp });
//       if (otpDoc) {
//         await otpModel.deleteOne({ _id: otpDoc._id }); 
//         res.status(200).json({
//           success: true,
//           message: 'OTP verified successfully'
//         });
//       } else {
//         res.status(400).json({
//           success: false,
//           message: 'Invalid OTP'
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   };
  module.exports={sendOtp,
//   verifyOtp
}