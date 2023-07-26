const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const User = require("../models/user.profile");
const Product = require("../models/products");
const Address = require("../models/address.book");
const ScrollView = require('../models/scroll.view');
router.post("/addScroll", async (req, res) => {
    try {
      const { title, pictures } = req.body;
      const scrollView = new ScrollView({ title, pictures });
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