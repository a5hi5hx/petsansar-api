const mongoose = require("mongoose");
const store = require('./store.model');
const Schema = mongoose.Schema;

const Store = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: store
    },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
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

module.exports = mongoose.model("StoreDesc", Store);