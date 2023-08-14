const express = require('express');
const router = express.Router();
require('dotenv').config();
const Order = require('../models/order.model');
const Product = require('../models/products');
const Cart = require("../models/cart.model");
const { findById } = require('../models/otp.model');
const noti = require('../controllers/notification');
// POST /orders - Place a new order
router.post('/placeorders', async (req, res) => {
  try {
    const {
      userId,
      products,
      quantity,
      addressId,
      paymentType,
      devices,
    } = req.body;

    // Validate request data
    if (!userId || !products || !quantity || !addressId || !paymentType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if all product IDs are valid
    for (const productId of products) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ error: 'Invalid product ID' });
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
       deliveryFee = 300;
    }
    else if (totalQuantity<=6){
       deliveryFee=500;
    }
    else{
       deliveryFee=800;
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
const a = noti.SendBuyNotification();
const ai = sendorderNotification(devices);
    res.status(200).json({savedOrder, message: 'Success'});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to place the order' });
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
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});




router.delete("/cart/delete-product", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ _id: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the item to be deleted in the items array
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Get the quantity and price of the item to be deleted
    const { quantity, product } = cart.items[itemIndex];
    const p = await Product.findOne({_id:product});
    const productPrice = p.price;

    // Remove the item from the items array
    cart.items.splice(itemIndex, 1);

    // Recalculate the total price by deducting the price of the deleted item
    cart.totalPrice -= quantity * productPrice;

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error});
  }
});

router.put("/cart/update-cart-item", async (req, res) => {
  try {
    const { userId, productId, qquantity } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ _id: userId });
   // console.log(cart);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the item to be updated
    const cartItem = cart.items.find((item) => item.product.toString() === productId);
   // console.log('cartItem');

    //console.log(cartItem);

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
//console.log(itemIndex);
    const { quantity, product } = cart.items[itemIndex];
    const p = await Product.findOne({product});
    const productPrice = p.price;
    
    // Update the item's quantity
    const qquat =  quantity + qquantity;
   // console.log(qquat);
    cartItem.quantity = qquat;

    // Calculate the total price
    const qqqq = cart.totalPrice + qquantity * productPrice;
   // console.log(qqqq);

    cart.totalPrice =qqqq;
    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


router.get("/cart/all/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user's cart and populate the product information
    const cart = await Cart.findOne({ _id: id }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});
const pushNotificationService = require("../controllers/notificationservice");

function sendorderNotification(devices) {
  var message = {
    app_id: process.env.one_signal_appID,
    contents: { en: "Order Placed successfully" },
    //included_segments: ["included_palyer_ids"],
    include_player_ids: [devices],
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "Pet Sansar",
    },
  };

  pushNotificationService.sendNotification(message, (error, results) => {
    if (error) {
      return next(error);
    }
  });
}
module.exports = router;
