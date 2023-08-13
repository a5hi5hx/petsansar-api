const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const User = require("../models/user.profile");
const Product = require("../models/products");
const Address = require("../models/address.book");
const ScrollView = require('../models/scroll.view');
const multer = require("multer");
const cloudinary = require("cloudinary"); // Replace with the actual path to your Cloudinary config file
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
router.post("/addScroll", upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file;

    if (!title || !image) {
      return res.status(400).json({ error: "Please provide title and a picture" });
    }

    // Upload the picture to Cloudinary and get the URL
    const pees = await cloudinary.v2.uploader
    .upload_stream({ resource_type: "image",folder: "petsansar"  }, (err, pes) => {
      if (pes) {
        const newMainCategory = new ScrollView({
          title,
          pictures: pes.secure_url
                });
        newMainCategory
          .save()
          .then((newP) => {
            res.status(200).json({mesage: 'Success'});
          })
          .catch((err) => {
            res.status(400).json({
              message: "Error Saving Item",
            });
          });
      } else {
        res.status(400).json({ message: "Error Uploading Image" });
      }       
    })
    .end(image.buffer);
    // const pes = await cloudinary.v2.uploader
    // .upload_stream({ resource_type: "image",folder: "petsansar"});
    // // Save data with Cloudinary URL to MongoDB
    // console.log(pes.url);
    // const scrollView = new ScrollView({ title, pictures: pes.secure_url });
    // await scrollView.save();

    // res.status(201).json({ message: "Data added successfully", data: scrollView });
  } catch (error) {
    console.log(error);
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
  

  router.get("/viewOrders", async (req, res) => {
  
    try {
      // Find orders by the specified user ID
      const orders = await Order.find({}).populate("user").populate("products").populate("address");
      res.status(200).json(orders);
    } catch (error) {
     console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


module.exports = router;