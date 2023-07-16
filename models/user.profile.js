//done
const mongoose = require("mongoose");
const user = require('./user.model');
const Schema = mongoose.Schema;

const User = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "please enter valid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const phoneRegex = /^98\d{8}$/; 
        return phoneRegex.test(value);
      },
      message: 'Invalid phone number format',
    },
  },
  address: {
    type: String,
  },
  image: {
   type: String,
   default:"https://res.cloudinary.com/djq37xptm/image/upload/v1677953696/i02sxwh0mn1biz6ivgiu.jpg",
  },

});

module.exports = mongoose.model("User", User);