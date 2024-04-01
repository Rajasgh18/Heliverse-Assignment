const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const CORS = require('cors');
const connectToDB = require('./db.js');

const userRoute = require('./routes/user.js');


app.use(CORS());
app.use(express.json());
app.use(bodyParser.json());

connectToDB();

app.get('/', (req, res)=> res.send("This is an Server for Heliverse Assignment"));

app.use("/api/users", userRoute);

app.listen(5000, () => {
    console.log("Server listening at http://localhost:5000");
});