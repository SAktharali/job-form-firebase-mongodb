// import React, { useState,useRef } from 'react';
// import firebase from '../fireBase/firebase';
// import { toast } from "react-hot-toast";
// import {useNavigate} from 'react-router-dom'
// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [verificationOtp, setVerificationOtp] = useState('');

// const recaptchaRef=useRef(null);
// const Navigate=useNavigate();

// const handleSubmit=()=>{

//   const handleSendOtp=()=>{
// if(recaptchaRef.current){
// recaptchaRef.current.innerHTML="<div id='recaptcha-container'></div>"
// }

//     const verifier=new firebase.auth.RecaptchaVerifier('recaptcha-container',{
//       size:'invisible'
//     });


//     firebase.auth().signInWithPhoneNumber(phoneNumber,verifier)
//     .then(confirmationResult =>{
// setVerificationId(confirmationResult.verificationId)
// toast.success("OTP sent successfully to your number")
//     })
//     .catch(error=>{
//       toast.error("OTP not sent")
//       console.log('error in sending OTP:',error);
//     })
//   }

//   const handleVerifyOtp=()=>{
// const credentials=firebase.auth.PhoneAuthProvider.credential(verificationId,verificationOtp)
// firebase.auth().signInWithCredential(credentials)
// .then(userCredential=>{
//   toast.success('User Logged In');
//   Navigate('/home');
// console.log('User Logged In:',userCredential.user);
// })
// .catch(error=>{
//   toast.error('Entered Wrong OTP!');
//   console.error('error verifying OTP:-',error.message);
// })
//   }
// }

//   return (
//     <div className='d-flex justify-content-center align-items-center vh-100'>
//       <div className='card p-3' 
//       style={{ width: '300px' }}>
//         <div ref={recaptchaRef} ></div>
//         <form onSubmit={handleSubmit}>
//        <div className='mb-2'>
//         <label htmlFor="phoneNumber">
//           <strong>PhoneNumber:</strong>
//           </label>
//         <input type="tel"
//          name='phoneNumber'
//          className='form-control'
//          placeholder='Enter Phone Number'
//          onChange={e=>setPhoneNumber(e.target.value)} 
//          />
//        <button 
//        className='btn btn-primary mt-2 w-100'
//         onClick={handleSendOtp}>Send OTP</button>
//         </div>
//         <div>
//        <input type="text" 
//        className='form-control' 
//        placeholder='Enter OTP'
//        onChange={(e)=>setVerificationOtp(e.target.value)}/>
//        <button
//         className='btn btn-success mt-2 w-100'
//         onClick={handleVerifyOtp}>Verify OTP</button>
//  </div>
//  </form>
//         </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useRef } from 'react';
import firebase from '../fireBase/firebase';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationOtp, setVerificationOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (recaptchaRef.current) {
      recaptchaRef.current.innerHTML = "<div id='recaptcha-container'></div>";
    }

    const verifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, verifier);
      setVerificationId(confirmationResult.verificationId);
      setIsOtpSent(true);
      toast.success("OTP sent successfully to your number");
    } catch (error) {
      toast.error("OTP not sent");
      console.error('Error in sending OTP:', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!verificationOtp || verificationOtp.length < 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    const credentials = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationOtp);
    try {
      const userCredential = await firebase.auth().signInWithCredential(credentials);
      toast.success('User Logged In');
      navigate('/home');
      console.log('User Logged In:', userCredential.user);
    } catch (error) {
      toast.error('Entered Wrong OTP!');
      console.error('Error verifying OTP:', error.message);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-3' style={{ width: '300px' }}>
        <div ref={recaptchaRef}></div>
        <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
          <div className='mb-2'>
            <label htmlFor="phoneNumber"><strong>Phone Number:</strong></label>
            <input
              type="tel"
              name='phoneNumber'
              className='form-control'
              placeholder='Enter Phone Number'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              disabled={isOtpSent}
            />
          </div>
          {isOtpSent && (
            <div className='mb-2'>
              <label htmlFor="otp"><strong>OTP:</strong></label>
              <input
                type="text"
                name='otp'
                className='form-control'
                placeholder='Enter OTP'
                value={verificationOtp}
                onChange={(e) => setVerificationOtp(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            className={`btn mt-2 w-100 ${isOtpSent ? 'btn-success' : 'btn-primary'}`}
          >
            {isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;



 