const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.profile');
const addressSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: User, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
});

module.exports = mongoose.model('AddressBook', addressSchema);
