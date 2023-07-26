const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const User = require("../models/user.profile");
const Product = require("../models/products");
const Address = require("../models/address.book");
const ScrollView = require('../models/scroll.view');
const multer = require("multer");
const cloudinary = require("cloudinary"); // Replace with the actual path to your Cloudinary config file
const ScrollView = require("./path/to/scrollViewModel"); // Replace with the actual path to your model file
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
// API route to add data with picture upload
router.post("/add", upload.single("picture"), async (req, res) => {
  try {
    const { title } = req.body;
    const picture = req.file;

    if (!title || !picture) {
      return res.status(400).json({ error: "Please provide title and a picture" });
    }

    // Upload the picture to Cloudinary and get the URL
    const result = await cloudinary.uploader.upload(picture.buffer, {
      folder: "scrollView_pictures", // Set your desired folder name on Cloudinary
    });

    // Save data with Cloudinary URL to MongoDB
    const scrollView = new ScrollView({ title, pictures: [result.secure_url] });
    await scrollView.save();

    res.status(201).json({ message: "Data added successfully", data: scrollView });
  } catch (error) {
    res.status(500).json({ error: "Failed to add data" });
  }
});


  
  // API route to remove data by ID
  router.delete("/removeScroll/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deletedData = await ScrollView.findByIdAndDelete(id);
      if (!deletedData) {
        return res.status(404).json({ error: "Data not found" });
      }
      res.json({ message: "Data removed successfully", data: deletedData });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove data" });
    }
  });
  
  // API route to view all data
  router.get("/viewScroll", async (req, res) => {
    try {
      const allData = await ScrollView.find();
      res.json(allData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });
  
  module.exports = router;




module.exports = router;