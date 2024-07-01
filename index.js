const express = require('express');
const path = require('path');

// import routers
const indexRouter = require("./routes/indexRouter");

// import utils
const startServer = require("./utils/startServer");

const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use("/", indexRouter); 
 
// start server
startServer(app);