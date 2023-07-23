const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const Product = require("../models/products");

// POST /cart/addItem endpoint to add an item to the cart
router.post("cart/addItem", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ _id: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create a new cart item
    const cartItem = {
      product: product._id,
      quantity: quantity || 1,
    };

    // Add the cart item to the cart
    cart.items.push(cartItem);

    // Update the total price of the cart
    cart.totalPrice += product.price * cartItem.quantity;

    // Save the cart
    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the item to the cart" });
  }
});



// GET /cart/:userId/items endpoint to get all items in a user's cart
router.get("cart/:userId/items", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user's cart
    const cart = await Cart.findOne({ _id: userId }).populate("items.product", "-image");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving the cart items" });
  }
});

router.delete("cart/:userId/items/:itemId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const itemId = req.params.itemId;
  
      // Find the user's cart
      const cart = await Cart.findOne({ _id: userId });
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      // Find the index of the item in the cart's items array
      const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found in cart" });
      }
  
      // Remove the item from the cart's items array
      cart.items.splice(itemIndex, 1);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: "Cart item deleted successfully", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting the cart item" });
    }
  });
  
  router.get("/search", async (req, res) => {
    const { search } = req.query;
    try {
      const products = await Product.find({
        $or: [
          { name: { $regex: search, $options: "i" } }, // Case-insensitive name search
          { keywords: { $in: search.split(",").map((keyword) => keyword.trim()) } }, // Keywords search
        ],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
