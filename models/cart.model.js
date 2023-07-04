const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require('./products');
const User = require('./user.profile');
const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: Product, required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: User, required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cart", cartSchema);
