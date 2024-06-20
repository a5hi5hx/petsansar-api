
![Logo](https://res.cloudinary.com/ds1swdnv8/image/upload/v1718851988/v2meidoonnjeperjoghu.jpg)


# PetSansar Server

Developed the PetSansar mobile app using Flutter, allowing users to browse and purchase pets and pet-related products, featuring user profiles, favorites, and notifications, integrated via a backend API for product information and user authentication. Additionally, created a Node.js server with a RESTful API for CRUD operations, enhancing efficiency with Express.js and Mongoose, and deployed it on Cyclic and MongoDB Atlas, including an admin dashboard for managing shop details.










## Run Locally

Clone the project

```bash
  git clone https://github.com/a5hi5hx/petsansar-api
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### .env Configuration

```plaintext
# Server Configuration
PORT=3000
tokenSecret=[YOUR_TOKEN_SECRET]
otp_pass=[YOUR_OTP_PASS]
otp_email=[YOUR_OTP_EMAIL]

# Database Configuration
DB_Pass=[YOUR_DB_PASSWORD]
DB_User=adoptmeUser
url=mongodb+srv://adoptmeUser:[YOUR_DB_PASSWORD]@cluster0.inki3s6.mongodb.net/PetSansar?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUD_NAME=[YOUR_CLOUD_NAME]
API_KEY=[YOUR_API_KEY]
API_SECRET=[YOUR_API_SECRET]

# JWT Configuration
JWT_SECRET=[YOUR_JWT_SECRET]

# SendGrid Configuration
SENDGRID_API_KEY=[YOUR_SENDGRID_API_KEY]

# Google OAuth Configuration
CLIENT_ID=[YOUR_CLIENT_ID]
CLIENT_SECRET=[YOUR_CLIENT_SECRET]
REDIRECT_URI=https://developers.google.com/oauthplayground
REFRESH_TOKEN=[YOUR_REFRESH_TOKEN]

# Email Configuration
username=[YOUR_EMAIL_USERNAME]
password=[YOUR_EMAIL_PASSWORD]

# OneSignal Configuration
one_signal_appID=[YOUR_ONESIGNAL_APP_ID]
one_signal_ApiKey=[YOUR_ONESIGNAL_API_KEY]


