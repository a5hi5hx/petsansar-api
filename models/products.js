const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId},
  brand: { type: String, required: true },
  image: [{ type: String, required: true }],
  quantity: { type: Number, default: 0 },
  discount: {type: Number},
  keywords: [{type: String}],
});

module.exports = mongoose.model("Product", productSchema);
