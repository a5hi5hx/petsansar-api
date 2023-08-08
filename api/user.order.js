const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Product = require('../models/products');
const Cart = require("../models/cart.model");

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
  
  router.get("/viewOrder/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find orders by the specified user ID
      const orders = await Order.find({ user: userId }).populate("products").populate("address");
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });



// router.post("/cart/add-to-cart", async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     // Check if the user's cart exists
//     let cart = await Cart.findOne({ _id: userId });

//     if (!cart) {
//       // If cart doesn't exist, create a new cart
//       cart = new Cart({ _id: userId });
//     }

//     // Check if the item is already in the cart
//     const existingItem = cart.items.find((item) => item.product.toString() === productId);
//     if (existingItem) {
//       // If the item already exists, update the quantity
//       existingItem.quantity += quantity;
//     } else {
//       // If the item doesn't exist, add it to the cart
//       cart.items.push({ product: productId, quantity });
//     }

//     // Calculate the total price
//     cart.totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

//     // Save the cart
//     await cart.save();

//     res.status(200).json(cart);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to add item to cart" });
//   }
// });
router.post("/cart/add-to-cart", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user's cart exists
    let cart = await Cart.findOne({ _id: userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart
      cart = new Cart({ _id: userId });
    }

    // Check if the item is already in the cart
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      // If the item already exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Calculate the total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }
    cart.totalPrice = totalPrice;

    // Save the cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});




router.delete("/delete-from-cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ _id: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Check if the item to be deleted exists in the cart
    const cartItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(cartItemIndex, 1);

    // Calculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item from cart" });
  }
});

router.put("/update-cart-item", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ _id: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the item to be updated
    const cartItem = cart.items.find((item) => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Update the item's quantity
    cartItem.quantity = quantity;

    // Calculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

module.exports = router;
