
require('dotenv').config();
const express = require('express');
const router = require("./routes/user-routes");
const cors = require("cors");
const connection = require("./db");

// Database connection
connection();

const app = express();
// Middlewares
app.use(cors(({ credentials: true, origin: "http://localhost:3000" })));
app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;