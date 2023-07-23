const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Product = require('../models/products');

// POST /orders - Place a new order
router.post('/placeorders', async (req, res) => {
  try {
    const {
      userId,
      products,
      quantity,
      addressId,
      paymentType,
    } = req.body;

    // Validate request data
    if (!userId || !products || !quantity || !addressId || !paymentType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if all product IDs are valid
    for (const productId of products) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Invalid product ID' });
      }
    }

    // Calculate total price by referencing products and quantity
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(products[i]);
      totalPrice += product.price * quantity[i];
    }

    // Calculate delivery fee based on the sum of all quantities
    const totalQuantity = quantity.reduce((acc, curr) => acc + curr, 0);
   var deliveryFee = 0;
    if(totalQuantity<=2){
       deliveryFee = 100;
    }
    else if (totalQuantity<=6){
       deliveryFee=200;
    }
    else{
       deliveryFee=350;
    }
    

    // Create a new order instance using the Order model
    const newOrder = new Order({
      user: userId,
      products,
      quantity,
      address: addressId,
      totalPrice,
      deliveryFee,
      paymentType,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Reduce quantities of ordered products in the products schema
    for (let i = 0; i < products.length; i++) {
      await Product.findByIdAndUpdate(products[i], { $inc: { quantity: -1 } });
    }

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mesasge: 'Failed to place the order' });
  }
});

// DELETE /orders/:orderId - Delete a placed order
router.delete('/order/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Find the order by ID
      const order = await Order.findById(orderId);
      
      // If the order doesn't exist, return a 404 Not Found response
      if (!order) {
        return res.status(400).json({ error: 'Order not found' });
      }
  
      // Increase the quantity of each product in the order by 1
      for (const product of order.products) {
        await Product.findByIdAndUpdate(product, { $inc: { quantity: 1 } });
      }
  
      // Delete the order from the database
      await order.remove();
  
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the order' });
    }
  });
  


module.exports = router;
