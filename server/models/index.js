const mongoose = require('mongoose');

module.exports.connect = (uri) => {

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("connected");
        }
    });

    mongoose.connection.on('error', (err) => {
        console.error(`DB connection error: ${err}`);
        process.exit(1);
    });

    // load models
    require('./planet');
};