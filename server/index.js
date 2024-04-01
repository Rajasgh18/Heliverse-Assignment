// Importing Packges/Functions
const express = require('express');
const app = express();
const CORS = require('cors');
const connectToDB = require('./db.js');

// Importing Routes
const userRoute = require('./routes/user');
const filterRoute = require('./routes/user/filter.js');
const searchRoute = require('./routes/user/search.js');

// Applying CORS and added parsing JSON so that JSON data becomes available in req.body
app.use(CORS());
app.use(express.json());

// Connecting to MongoDB using Mongoose
connectToDB();

// Defining routes for the API
app.get('/', (req, res)=> res.send("This is an Server for Heliverse Assignment"));
app.use("/api/users/search", searchRoute);
app.use("/api/users/filter", filterRoute);
app.use("/api/users", userRoute);

// Running the Server at port 5000
app.listen(5000, () => {
    console.log("Server listening at http://localhost:5000");
});