const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const start = require("./utils/startServer");


// import routers
const indexRouter = require("./routes/indexRouter");

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/", indexRouter); 

// Start server
start(app);