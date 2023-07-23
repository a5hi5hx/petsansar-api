const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flashSale = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
  },
discount: {
    type: Number,
}
});
module.exports = mongoose.model("FlashSale", flashSale);
