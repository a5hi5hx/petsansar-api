const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Store = Schema({
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
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        const phoneRegex = /^98\d{8}$/;
        const landRegex = /^061\d{6}$/; 
        if((phoneRegex.test(value) || landRegex.test(value)))
        {return;}      
      },
      message: 'Invalid phone number format',
    },
  },
  image: {
   type: String,
   default:"https://res.cloudinary.com/djq37xptm/image/upload/v1677953696/i02sxwh0mn1biz6ivgiu.jpg",
  },
});

module.exports = mongoose.model("StoreData", Store);