const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrollViewSchema = new Schema({
  title: { type: String, required: true },
  pictures: { type: String, required: true },
});

module.exports = mongoose.model("ScrollView", scrollViewSchema);
