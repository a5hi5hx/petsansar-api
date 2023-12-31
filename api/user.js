const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.profile');
const jwt = require("jsonwebtoken");
const router = express.Router();
const otpsave = require('../models/otp.model');
const cloudinary = require("cloudinary");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const JWT = require('../middlewares/jwt');
const EMAIL = require('../middlewares/sendEmail');
const AddressBook = require('../models/address.book');
const checkRole = require('../middlewares/authRole');
const nodemailer = require('nodemailer');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ msg: "Access denied" });
    }
    const verified = jwt.verify(token, "somesecretkey");
    if (!verified) {
      return res.status(401).json({ msg: "Token Verify failed. Auth denied" });
    }
    req.user = verified.id;
    req.token = token;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
router.all('/', (req, res)=> {
  res.status(404).json({message: "Use Proper Routes and Roles"});
  });

router.post("/signup", async (req, res) => {
const {name, email, password, phoneNumber} = req.body;
try {
    if(await User.findOne({email: email}) || await User.findOne({phoneNumber: phoneNumber}))
    {
        return res.status(400).json({message: "User already exists. Try resetting password.", success: false});
    }
const saltvalue = await Math.floor(Math.random() * (20 - 10 + 1)) + 10;
const salt =  await bcrypt.genSaltSync(saltvalue);
const encpassword =  await bcrypt.hashSync(password, salt);
    // Save user to MongoDB
    let usr = new User({
      email, password: encpassword, name, phoneNumber
  });
  if(await usr.validate()){
    return res.status(400).json({message: "Validation Error. Try validating all fields first.", success: false});
}
 await usr.save()
      .then(() => {
            const token = jwt.sign({ id: usr._id, role:usr.role }, process.env.tokenSecret);
        //EMAIL.otpSend(req.body.email);
    delete usr._doc.password;
    const {name, email, phoneNumber, image, _id} = usr._doc;
  const  isVerifiedd=usr._doc.isVerified.toString();
            res.status(201).json({ message: "User created.", success: true ,name, email, phoneNumber,image,_id, isVerified:isVerifiedd, token: token});
          })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: "Error saving user" });
      });
      
// await usr.save()
//   .then(() => {
//     const token = jwt.sign({ id: usr._id }, process.env.tokenSecret);
// sendOTPByEmail(email);
//     res.status(201).json({ message: "User created.", success: true , token: token});
//   })
//   .catch((error) => {
//     res.status(400).json({ message: "User Creation error", success: false, error: error });
//   });
  // }}).end(image.buffer);
} catch (error) {
  console.log(error);
    if (error.name === 'ValidationError') {
        if (error.errors.phoneNumber && error.errors.phoneNumber.kind === 'regexp') {
          return res
            .status(400)
            .json({ message: "Invalid phone number format.", success: false });
        }
        if (error.errors.email && error.errors.email.kind === 'regexp') {
            return res
              .status(400)
              .json({ message: "Please enter a valid email address.", success: false });
          }
      }
      
      res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
    }

});


router.post('/login', async (req, res) => {
    const {email, userpassword} = req.body;
try {
    const user = await User.findOne({email: email});

    if(!user)
    {
        return res.status(400).json({message: "User doesn't exists. SignUp Now.", success: false});
    }
    if(user.isVerified == false)
    {
      return res.status(400).json({message: "User not verified", success: false});

    }

  //   "message": "valid Password.",
  // "success": true,
  // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NkMzUxOTZkMmFiY2JhODQ3NjZkNSIsImlhdCI6MTY5MTQ2NDU0MX0.VGhu7QImE5peRF1v2_pMB2iVZH0eh5yi9Cp2PdH4pcI",
  // "_id": "64ccd35196d2abcba84766d5",
  // "email": "ashishpaudel54@gmail.com",
  // "isVerified": true,
  // "name": "Ashish Paudel",
  // "phoneNumber": "9846880362",
  // "image": "https://res.cloudinary.com/djq37xptm/image/upload/v1677953696/i02sxwh0mn1biz6ivgiu.jpg",
  // "__v": 0
    bcrypt.compare(userpassword, user.password, function(err, result) {
      if (err) {
        return res.status(400).json({message: "Invalid Password.", success: false});
      }
      if (result) {
        const token = JWT.generateNewToken({ id: user._id, role: user.role});
        //delete user._doc.password;
        const { _id, name, image, email, phoneNumber } = user._doc;
        const isVerifiedd =  (user._doc.isVerified).toString();
        return res.status(201).json({message: "valid Password.", success: true, token: token, _id, name, phoneNumber, email, image, isVerified: isVerifiedd});
      } else {
        return res.status(400).json({message: "Invalid Password.", success: false});
      }
    });
} catch (error) {
    return res.status(500).json({message: "Some error occured.", success: false});
}
});


router.get("/tokenValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(400).json({ msg: false , success: false});
      }
      const verified = jwt.verify(token, process.env.tokenSecret);
      if (!verified) {
        return res.status(400).json({ msg: false , success: false});
      }
      const user = await User.findById(verified.id);
      if (!user) {
        return res.status(400).json({ msg: false, success: false });
      }
      const { _id, username, email, password, phoneNumber } = user._doc;
      const isVerifiedd =  (user._doc.isVerified).toString();
      return res.status(201).json({ msg: true, success: true, _id, username, email, password, phoneNumber, isVerified:isVerifiedd });
  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  router.route("/user").get(auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  });

router.post('/verifyUser', async (req, res) => {
    const { email, otp } = req.body;
   try{ 
    const user = await User.findOne({ email });
    if (user.isVerified == false) {
    const otuser = await otpsave.find({email: email});
    if(otuser.otp == otp){
      await otpsave.deleteMany({email: email});
    }
  user.isVerified = true;
  await user.save();
  delete user._doc.password;
  const isVerifiedd =  (user._doc.isVerified).toString();
  const { _id, name, image, email, phoneNumber } = user._doc;
  return res.status(201).json({ msg: 'User Verified', success: true, _id, username, email, password, phoneNumber, isVerified:isVerifiedd });

  //return res.status(200).json({ message: 'User Verified', success: true, ...user._doc });
}
else if (user.isVerified == true) {
  return res.status(200).json({ message: 'User Already Verified', success: false });
}

return res.status(400).json({ message: 'Error try again', success: false });
 
}catch(error){
  return res.status(500).json({ message: "Some error occurred.", success: false });
}
  });

 router.post('/imgUpload', upload.single("image"), async (req, res) => {
    const image = req.file;
    try {
     await jwt.verify(token, process.env.tokenSecret, (err, decoded) => {
        if (err) {
          // Handle token verification error
          return res.status(401).json({ error: 'Invalid token' });
        }
        const uid = decoded.id;
        if(!( User.findOne({_id: uid})))
        {
            return res.status(400).json({message: "User doesn't exists. Try sign up.", success: false});
        }
  
    const rs =  cloudinary.v2.uploader
    .upload_stream({ resource_type: "image",folder: "users" }, (error, result) => {
      if (result) {
        User.findByIdAndUpdate({_id: uid}, { image: result.url })
        .then(updatedUser => {
          console.log('Updated user:', updatedUser);
         delete updatedUser._doc.password
          res.status(201).json({ message: "User created.", success: true ,updatedUser});
        })
        .catch(err => {
          console.error('Error updating user:', err);
        });
          
  
      }}).end(image.buffer);
    })} catch (error) {
      console.log(error);
          res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
        }
    
    });


 router.post('/addprofile', async (req, res) => {
      try {
           const {  id, name, phoneNumber, address, email} = req.body;
        const user = new UserProfile({
          _id: id,
          name,
          phoneNumber,
          address,
          email
        });
       const prf = await user.save();
       res.status(201).json({ message: 'User details saved successfully', prf});
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Server Error', error });
     }
    });
    
router.get('/viewDetails/:id' ,async (req, res) => {
      try {
          const user = await UserProfile.find({_id: req.params.id});
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: 'No User found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
      }
    });
    
    router.post('/addAddress', async (req, res) => {
      try {
          
        const { id, phone, street, city, state, postalCode } = req.body;
    
        // Validate required fields
        if ( !phone || !street || !city || !state || !postalCode) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
    
        // Create a new address entry
        const newAddress = new AddressBook({
          _id: id,
          phone,
          street,
          city,
          state,
          postalCode
        })
    await newAddress.save().then((u, err)=> {
      if(u){
        res.status(201).json(u);
      }
      else{
        res.status(400).json(err);
      }
    }).catch((er)=>{
      console.log("Error in saving data", er )
      res.status(400).json(err);

    })
        // Return the newly created address
      } catch (error) {
        console.error('Error creating address:', error);
        res.status(500).json({ error: 'Failed to create address' });
      }
    });
  
    router.get('/address/:userId', async (req, res) => {
      try {
        const userId  = req.params;
    
        // Retrieve the address and populate the required field
        const address = await AddressBook.findOne({ _id: userId }).populate('_id');
    
        // Check if the address exists
        if (!address) {
          return res.status(404).json({ error: 'Address not found' });
        }
    
        // Return the address with the populated field
        res.json(address);
      } catch (error) {
        console.error('Error retrieving address:', error);
        res.status(500).json({ error: 'Failed to retrieve address' });
      }
    });

    router.put('/editAddress/:id',  async (req, res) => {
      try {
           
        const { phone, street, city, state, postalCode } = req.body;
    
        // Find the address by userId
        let address = await AddressBook.findOne({ _id: req.params.id });
    
        // Check if the address exists
        if (!address) {
          return res.status(404).json({ error: 'Address not found' });
        }
    
        // Update the address fields
        address.phone = phone || address.phone;
        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.postalCode = postalCode || address.postalCode;
    
        // Save the updated address
        address = await address.save();
    
        // Return the updated address
        res.json(address); 
      } catch (error) {
        console.error('Error editing address:', error);
        res.status(500).json({ error: 'Failed to edit address' });
      }
    });


  router.post('/verifyEmails', async (req, res)=> {
      const email = req.body.email;
      try {
        generateOtp =async function () {
          const zeros = '0'.repeat(3);
          const x = parseFloat('1' + zeros);
          const y = parseFloat('9' + zeros);
          const confirmationCode = (Math.floor(x + Math.random() * y));
       return confirmationCode;
      }
      const otp = await generateOtp();
       
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.otp_email,
            pass: process.env.otp_pass,
          },
        });
        const mailOptions = {
          from: process.env.otp_email,
          to: email,
          subject: 'OTP Verification',
          html: `<h3>Your OTP is<h2> ${otp}</h2>. Valid for 10 minutes. Please use it to verify your account.</h3>`,
        };
        // Send the email
       await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            const expiryTimestamp = Date.now() + 10 * 60 * 1000;
            const data = new otpsave({
              email,
              otp,
              expiryDate: expiryTimestamp.toString(),
            });
             data.save();
            console.log('Email sent: ' + info.response);
            return res.status(201).json({msg: "success"});

          }
        });
   } catch (error) {
    console.log(error);
        return res.status(500).json({msg: "failed"});
      }
    } );
    

   
module.exports = router;
