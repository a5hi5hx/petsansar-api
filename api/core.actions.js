const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const User = require("../models/user.profile");
const Product = require("../models/products");
const Address = require("../models/address.book");

// POST /orders/placeOrder endpoint to place an order
router.post("/placeOrder", async (req, res) => {
  try {
    const { userId, productId, addressId, totalPrice, deliveryFee, paymentType } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    // Find the address by ID
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Create a new order
    const newOrder = new Order({
      user: user._id,
      products: [product._id],
      address: address._id,
      totalPrice,
      deliveryFee,
      paymentType,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (message) {
    console.message(message);
    res.status(400).json({ message: "An message occurred while placing the order" });
  }
});

module.exports = router;
