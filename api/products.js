const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
require("dotenv").config();


// Configure Multer to store image in buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
// Product Model
const Product = require("../models/products");

// POST /addProducts endpoint
// POST /add endpoint
// router.post("/add", upload.array("image"), async (req, res) => {
//   try {
//     const { name, description, price, category, brand, quantity, keywords } = req.body;

//     // Check if all required fields are present
//     if (!name || !description || !price || !category || !brand || !req.files) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Upload images to Cloudinary
//     const imagePromises = req.files.map((file) =>
//       cloudinary.uploader.upload(file.buffer)
//     );
//     const uploadedImages = await Promise.all(imagePromises);

//     // Extract image URLs from the Cloudinary response
//     const imageUrls = uploadedImages.map((image) => image.secure_url);

//     // Create a new product
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       brand,
//       image: imageUrls,
//       quantity,
//       keywords,
//     });

//     // Save the product to the database
//     const savedProduct = await newProduct.save();

//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: "An error occurred while adding the product" });
//   }
// });

// router.post("/", upload.array("image"), async (req, res) => {
//   try {
//     // Extract product data from request body
//     const { name, description, price, category, brand, quantity, keywords } = req.body;

//     // Check if all required fields are present
//     if (!name || !description || !price || !category  || !brand || !req.files) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Upload images to Cloudinary
//     const imagePromises = req.files.map((file) =>
//       cloudinary.uploader.upload(file.path)
//     );
//     const uploadedImages = await Promise.all(imagePromises);

//     // Extract image URLs from the Cloudinary response
//     const imageUrls = uploadedImages.map((image) => image.secure_url);

//     // Create a new product
//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       brand,
//       image: imageUrls,
//       quantity,
//       keywords,
//     });

//     // Save the product to the database
//     const savedProduct = await newProduct.save();

//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: "An error occurred while adding the product" });
//   }
// });

// router.get("/:categoryID", async (req, res) => {
//   try {
//     const categoryID = req.params.categoryID;

//     // Find products with the specified category ID
//     const products = await Product.find({ category: categoryID });

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: "An error occurred while retrieving products" });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     // Find all products
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: "An error occurred while retrieving products" });
//   }
// });

router.route("/add").post(upload.array("images"), async (req, res) => {

  var images = req.files; // Use req.files to access the uploaded files
  const { name, description, price, category, brand, quantity, keywords } = req.body;

    // Check if all required fields are present
    if (!name || !description || !price || !category || !brand || !req.files) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  if (!images || images.length < 2) { // Check if at least 2 images are uploaded
    return res.status(400).json({ msg: "Please upload two images" });
  }

  try {
    const uploadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { resource_type: "image",folder: "petsansar" },
          (error, result) => {
            if (result) {
              resolve(result.secure_url);
            } else {
              reject(error);
            }
          }
        ).end(image.buffer);
      });
    });

    Promise.all(uploadPromises)
      .then((imageUrls) => {
        const newProduct = new Product({
          name,
          description,
          price,
          brand,
          category,
          image: imageUrls,
          quantity,
          keywords,
        });

        newProduct
          .save()
          .then(() => {
            res.status(200).json({ message: "Product added successfully" });
          })
          .catch((err) => {
            res.status(500).json({
              msg: "Error saving pet",err
            });
          });
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ msg: "Error uploading images" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /products/:productID endpoint to delete a product
router.delete("/:productID", async (req, res) => {
  try {
    const productID = req.params.productID;
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productID);
    if (!deletedProduct) {
      return res.status(400).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while deleting the product" });
  }
});

router.put("/:productID", async (req, res) => {
  try {
    const productID = req.params.productID;
    const updatedProductData = req.body;

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while updating the product" });
  }
});

router.get("/available", async (req, res) => {
  try {
    // Find products with quantity > 0
    const products = await Product.find({ quantity: { $gt: 0 } });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while retrieving products" });
  }
});

router.get("/:categoryID", async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    // Find products by category ID
    const products = await Product.find({ category: categoryID });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occurred while retrieving products" });
  }
});


router.get("/detail/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by ID and populate the necessary fields
    const product = await Product.findById(productId)
      .populate("category")

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    res.status(200).json({product});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occurred while retrieving the product" });
  }
});
module.exports = router;
