const express = require('express');
const router = express.Router();
const MainCategory = require('../models/main.category.model');
const multer = require("multer");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// POST method to add a new category
router.post("/addCategory", upload.single("image"), async (req, res) => {
  const { name, description } = req.body;
    // Check if name and description are provided
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    // Check if image is uploaded
    var image = req.file;
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }
  try {
    const pes = await cloudinary.v2.uploader
      .upload_stream({ resource_type: "image"  }, (err, pes) => {
        if (pes) {
          const newMainCategory = new MainCategory({
            name,
            image: pes.secure_url,
            description,
          });
          newMainCategory
            .save()
            .then((newP) => {
              const  { name, image, description, status, _id, __v } = newP;
              res.status(200).json({ message: "Category added successfully", name, image, description, status, id: _id});
            })
            .catch((err) => {
              res.status(400).json({
                message: "Error Saving Category",
              });
            });
        } else {
          res.status(400).json({ message: "Error Uploading Image" });
        }       
      })
      .end(image.buffer);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Server error" });
  }
});

// router.post('/add', async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     // Check if the name and description are provided
//     if (!name || !description) {
//       return res.status(400).json({ error: 'Name and description are required' });
//     }

//     // Check if the category already exists
//     const existingCategory = await MainCategory.findOne({ name });
//     if (existingCategory) {
//       return res.status(409).json({ error: 'Category already exists' });
//     }

//     // Create a new category
//     const newCategory = await MainCategory.create({ name, description });

//     // Return the newly created category
//     res.status(201).json(newCategory);
//   } catch (error) {
//     console.error('Error adding category:', error);
//     res.status(500).json({ error: 'Failed to add category' });
//   }
// });
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     // Check if name and description are provided
//     if (!name || !description) {
//       return res.status(400).json({ error: 'Name and description are required' });
//     }

//     // Check if image is uploaded
//     if (!req.file) {
//       return res.status(400).json({ error: 'Image is required' });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);

//     // Create a new main category
//     const newMainCategory = new MainCategory({
//       name,
//       image: result.secure_url,
//       description,
//     });

//     // Save the main category to the database
//     const savedMainCategory = await newMainCategory.save();

//     res.status(201).json(savedMainCategory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while adding the main category' });
//   }
// });

router.get('/categories', async (req, res)=> {
try {
  const cate = await  MainCategory.find();
  return res.status(200).json({cate});
} catch (error) {
  return res.status(400).json({message: 'No Categories Found'});
}
});


module.exports = router;
