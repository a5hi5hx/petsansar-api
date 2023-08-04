const jwt = require("jsonwebtoken");
const jwtSecret = "somesecretkey";
const otpsave = require('../models/otp.model');
const nodemailer = require('nodemailer');
require('dotenv').config();
const EMAIL = {
  otpSend: async function (email) {
    //non blocking middleware.. just runs on every request to see if jwt exists, and captures it if it does
    generateOtp = function () {
      const zeros = '0'.repeat(3);
      const x = parseFloat('1' + zeros);
      const y = parseFloat('9' + zeros);
      const confirmationCode = (Math.floor(x + Math.random() * y));
   return confirmationCode;
  }
  const otp = generateOtp();
    const expiryTimestamp = Date.now() + 10 * 60 * 1000;
    const data = new otpsave({
      email,
      otp,
      expiryDate: expiryTimestamp.toString(),
    });
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.otp_email,
        pass: process.env.otp_pass,
      },
    });
    const mailOptions = {
      from: process.env.otp_email,
      to: email,
      subject: 'OTP Verification',
      html: `<h3>Your OTP is<h2> ${otp}</h2>. Valid for 10 minutes. Please use it to verify your account.</h3>`,
    };
    // Send the email
   await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
         data.save();
        console.log('Email sent: ' + info.response);

      }
    });
  },

//middleware reset password
  passwordReset:async function (email) {
    generateOtp = function () {
      const zeros = '0'.repeat(3);
      const x = parseFloat('1' + zeros);
      const y = parseFloat('9' + zeros);
      const confirmationCode = (Math.floor(x + Math.random() * y));
   return confirmationCode;
  }
  const otp = generateOtp();
    const expiryTimestamp = Date.now() + 5 * 60 * 1000;
    const data = new otpsave({
      email,
      otp,
      expiryDate: expiryTimestamp.toString(),
    });
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.otp_email,
        pass: process.env.otp_pass,
      },
    });
    const mailOptions = {
      from: process.env.otp_email,
      to: email,
      subject: 'Password Reset',
      html: `<h3>Your OTP is<h2> ${otp}</h2>. Valid for 5 minutes. Please use it to verify your account.</h3>`,
    };
    // Send the email
   await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
         data.save();
        console.log('Email sent: ' + info.response);
      }
    });
  },
  generateNewToken: function (payload) {
    return jwt.sign(payload, jwtSecret);
  },
};

module.exports = EMAIL;
