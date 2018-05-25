const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sanitize = require("mongo-sanitize");

const port = 3000;
const config = require('./config');
require('./models').connect(config.DBURL);

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Sanitizes all inputs for query selector injection attacks
app.use('/', (req, res, next) => {
    console.log("sanitize");
    req.body = sanitize(req.body);
    req.params = sanitize(req.params);
    next();
});

//Set Header to json, as that is what we want to return.
app.use('/', (req, res, next) => {
    console.log("headers set");
    res.setHeader('Content-Type', 'application/json');
    next();
});


//use routes defined in index.js file
var routes = require('./routes/index'); 
app.use(routes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('404 Page Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});