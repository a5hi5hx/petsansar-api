const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/petsansar', {
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

connectDB().then(()=> {
    app.listen(5000, () => {
        console.log("listening for requests");
      });
});
