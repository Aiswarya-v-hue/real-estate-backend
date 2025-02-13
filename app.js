const express = require('express');
const cors = require('cors');
const path = require('path');

// Import database configuration
require('./Database/Dataconfig');

// Import the main router
const sitedetailRouter = require('./Routers/sitedetailrouters'); // Adjust the path if needed
const brokerRouter = require('./Routers/brokerrouter'); 
const signuprouter = require('./Routers/logsiguprouter');
const loginrouter = require('./Routers/logsiguprouter')
const buyerrouter = require('./Routers/buyrouter')


// Initialize the Express app
const app = express();

// Set up middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Serve static image files
const imagepath = path.join(process.cwd(), 'Controllers', 'Data', 'image');
app.use('/api/Data/image', express.static(imagepath));

// Define routes
app.use('/api', sitedetailRouter); // Prefix all site detail routes with `/api`
app.use('/api/broker',brokerRouter);
app.use('/api',signuprouter);
app.use('/api',loginrouter);
app.use('/api/buyer',buyerrouter)


// Export the app instance for use in the main entry point
module.exports = app;
