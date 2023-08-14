//done
const mongoose = require("mongoose");
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
  },
  address: {
    type: String,
  },
  image: {
   type: String,
   default:"https://res.cloudinary.com/ds1swdnv8/image/upload/v1692006700/petsansar/n3ilxxd6nqx9qu9wnqq7.png",
  },

});

module.exports = mongoose.model("User", User);