const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const CORS = require('cors');


app.use(CORS());
app.use(express.json());
app.use(bodyParser.json());


app.listen(5000, () => {
    console.log("Server listening at http://localhost:5000");
});