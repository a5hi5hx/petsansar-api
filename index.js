const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const seedProducts = require('./seeds/seedData');
mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
    await mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((conn, err)=>{
    if(conn){
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    else{
        console.log(`MongoDB not connected:`, err);
    }
})
    }catch(error){
        console.log(`Error Occured`, error);
    }
}
app.use(express.json());
app.use(require('./routes/main'));


connectDB().then(async ()=> {
    app.listen(process.env.PORT, () => {
        console.log("listening for requests");
      });
});
