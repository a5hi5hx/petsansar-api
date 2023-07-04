const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: {type: String, required: true }
});

module.exports = mongoose.model('MainCategory', mainCategorySchema);
