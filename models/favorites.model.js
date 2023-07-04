const Product = require('./products');
const User = require('./user.profile');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const favoritesSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: User, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: Product, required: true }],
  });
  
  module.exports = mongoose.model("Favorites", favoritesSchema);