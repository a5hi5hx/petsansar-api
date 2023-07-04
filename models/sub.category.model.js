const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MainCategory = require('./main.category.model');
const subCategorySchema = new Schema({
  mainCategory: { type: Schema.Types.ObjectId, ref: MainCategory, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

module.exports = mongoose.model('SubCategory', subCategorySchema);