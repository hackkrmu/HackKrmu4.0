// const express = require('express');
// const cookieParser = require('cookie-parser');
// const http = require('http');
// const path = require('path');
// const cors = require('cors');
// const app = express();

// // Improved CORS Options
// const corsOptions = {
//   origin: ['http://localhost:3000', 'https://skinkare.vercel.app', 'https://oliveclear.com', 'https://psudohostingolive.vercel.app'], // Allowed origins
//   credentials: true, // Allow cookies to be sent
//   optionsSuccessStatus: 200 // To handle legacy browsers
// };

// app.use(cors(corsOptions));

// // Handle Preflight Requests for all routes
// app.options('*', cors(corsOptions));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Origin', req.get('origin')); // Dynamically allow the current origin if it is listed
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
//   next();
// });
// // Create the Express app
// app.use(cookieParser()); // Middleware for parsing cookies

// // Middleware to parse JSON and form-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Import your routes
// const registerRoute = require('./routes/register');
// const loginRoute = require('./routes/login');
// // const checkRoute = require('./routes/check-middle');
// const fpswrd = require('./routes/forgot-password');
// const discussionRoute = require('./routes/discussion');
// const productRoute = require('./routes/addproducts');
// const prescRoute = require('./routes/prescriptionhistory');
// const reviewRoute = require('./routes/review-product');
// const getProduct = require('./routes/products');
// const cartRoute = require('./routes/cart');
// const appointmentRoute = require('./routes/doctor-available');
// const doctorRoute = require('./routes/doctorreg');
// const face_model = require('./routes/face-detection-model');
// const orderRoute = require('./routes/orders');
// const healthRoute = require('./routes/health');
// const analyticRoute = require('./routes/analytics');
// const aichatbot = require('./routes/gemini');
// const useridRoute = require('./routes/getuserid')
// // const chatRoute = require('./routes/chatting')
// // const { initializeSocket  } = require('./controllers/chatting_controller')
// // Import chatRouter and serverconst { router: chatRouter, server: chatServer } = require('./routes/chatting');

// // Use the defined routes
// app.use('/', registerRoute, loginRoute, orderRoute, cartRoute, appointmentRoute, fpswrd, productRoute, getProduct, prescRoute, reviewRoute, useridRoute);
// app.use('/discuss', discussionRoute);
// app.use('/doc', doctorRoute);
// app.use('/aiface', face_model);
// app.use('/aichat', aichatbot)
// // Use the chatRouter for chat-related routes
// // app.use('/chat', chatRouter);
// app.use('/ht', healthRoute, analyticRoute);

// // Create the HTTP server with Socket.io (pass the app here)
// const httpServer = http.createServer(app);
// // const io = initializeSocket(httpServer);

// // Listen on a port
// httpServer.listen(80, '0.0.0.0', () => {
//   console.log('Server running on port 80');
// });

const express = require('express');

const cookieParser = require('cookie-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');
const app = express();
require("dotenv").config();
// Improved CORS Options
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://skinkare.vercel.app', 'https://oliveclear.com', 'https://psudohostingolive.vercel.app'], // Allowed origins
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200 // To handle legacy browsers
};

app.use(cors(corsOptions));

// Handle Preflight Requests for all routes
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.get('origin')); // Dynamically allow the current origin if it is listed
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  next();
});
// Create the Express app
app.use(cookieParser()); // Middleware for parsing cookies

// Middleware to parse JSON and form-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import your routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
// const checkRoute = require('./routes/check-middle');
const fpswrd = require('./routes/forgot-password');
const discussionRoute = require('./routes/discussion');
const productRoute = require('./routes/addproducts');
const prescRoute = require('./routes/prescriptionhistory');
const reviewRoute = require('./routes/review-product');
const getProduct = require('./routes/products');
const cartRoute = require('./routes/cart');
const appointmentRoute = require('./routes/doctor-available');
const doctorRoute = require('./routes/doctorreg');
const face_model = require('./routes/face-detection-model');
const orderRoute = require('./routes/orders');
const healthRoute = require('./routes/health');
const analyticRoute = require('./routes/analytics');
const aichatbot = require('./routes/gemini')
const chatRoute = require('./routes/chatting')
const useridRoute = require('./routes/getuserid')
const { initializeSocket  } = require('./controllers/chatting_controller')
// Import chatRouter and serverconst { router: chatRouter, server: chatServer } = require('./routes/chatting');

// Use the defined routes
app.use('/', 
  registerRoute, 
  loginRoute, 
  orderRoute, 
  cartRoute, 
  appointmentRoute, 
  fpswrd, 
  productRoute, 
  getProduct, 
  prescRoute, 
  reviewRoute, 
  chatRoute,
  useridRoute,
);
app.use('/discuss', discussionRoute);
app.use('/doc', doctorRoute);
app.use('/aiface', face_model);
app.use('/aichat', aichatbot)
// Use the chatRouter for chat-related routes
// app.use('/chat', chatRouter);
app.use('/ht', healthRoute, analyticRoute);

// Create the HTTP server with Socket.io (pass the app here)
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

// Listen on a port
httpServer.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});