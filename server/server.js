const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const allowHeaders = require('./src/middleware/allowHeaders');

// invoke an instance of express application
const app = express();

// Our DB Configuration
require('./src/db');

// Init allowed headers Middleware
app.use(allowHeaders);

// Init Middleware to allows AJAX requests to skip the Same-origin policy
// and access resources from remote hosts.
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ----------------------------------------------------------
// routings
// ----------------------------------------------------------
app.use('/books', require('./src/routes/book.router'));

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
