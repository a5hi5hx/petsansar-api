// const mongoose = require("mongoose");
const Products = require('./products');
const User = require('./user.profile');
const Address = require('./address.book');
// const Schema = mongoose.Schema;
// const order = Schema({
// });
// module.exports = mongoose.model("Orders", order);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: Products, required: true }],
  address: { type: Schema.Types.ObjectId, ref: Address, required: true },
  totalPrice: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  paymentType: { type: String, enum: ["Cash on Delivery", "Online Payment"], required: true },
  status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered"], default: "Pending" },
},
{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
