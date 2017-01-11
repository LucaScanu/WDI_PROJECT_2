//*****requiring installed packages*******/////

const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const mongoose       = require('mongoose');


const app            = express();
const config         = require('./config/config');
const apiRouter      = require('./config/apiRoutes');
const webRouter      = require('./config/webRoutes');

//*******connecting mongoose model************///
mongoose.connect(config.db);

//********setting up middleware*********////
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//*********connecting routes************//
app.use('/', webRouter);
app.use('/api', apiRouter);

app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));
