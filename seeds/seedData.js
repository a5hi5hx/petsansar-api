// const mongoose = require("mongoose");
// const Product = require("../models/products"); // Make sure to provide the correct path to your product model file
// const petSeeds = require("./seeds");
// require("dotenv").config();
// // Connect to your MongoDB database
// mongoose.connect(process.env.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Function to insert seeder data into the product collection
// async function seedProducts() {
//   try {
//     // Remove existing products (optional step, depending on your use case)
//     //await Product.deleteMany({});

//     // Insert the productSeederData array into the product collection
//     await Product.insertMany(petSeeds);

//     console.log("Seeder data inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting seeder data:", error);
//   } finally {
//     // Close the database connection
//     mongoose.disconnect();
//   }
// }

// // Call the seedProducts function to populate the database
// //seedProducts();
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open",async  () => {
//   console.log("Connected to MongoDB database.");
//   await seedProducts();
// });
// module.exports = seedProducts;