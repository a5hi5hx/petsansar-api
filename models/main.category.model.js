
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true, unique: false },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['active','inactive'], default: 'active' },
});

module.exports = mongoose.model('MainCategory', mainCategorySchema);
