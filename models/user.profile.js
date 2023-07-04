const mongoose = require("mongoose");
const user = require('./user.model');
const Schema = mongoose.Schema;

const User = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: user
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
  image: {
   type: String,
   default:"https://res.cloudinary.com/djq37xptm/image/upload/v1677953696/i02sxwh0mn1biz6ivgiu.jpg",
  },

});

module.exports = mongoose.model("User", User);