require('events').EventEmitter.defaultMaxListeners = 20;

const express = require('express');
const cors = require('cors');
require('./Database/Dataconfig'); // Ensure your database configuration is loaded
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', require('./Routers/sitedetailrouters')); // Main API routes

const brokerroutes = require('./Routers/brokerrouter');
app.use('/api/broker', brokerroutes); 
const signuprouter = require('./Routers/logsiguprouter');
app.use('/api', signuprouter);

const loginrouter = require('./Routers/logsiguprouter');
app.use('/api', loginrouter);

const buyerrouter = require('./Routers/buyrouter');
app.use('/api/buyer', buyerrouter);

// Root route to avoid "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

// Make sure this is set up before app.listen()
console.log("broker routes initialized");

// Start server
app.listen(port, (err) => {
  if (err) {
    console.error(`Error: Unable to start the server on port ${port}`, err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
