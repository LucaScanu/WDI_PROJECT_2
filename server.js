const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const mongoose       = require('mongoose');


const app            = express();
const config         = require('./config/config');
const apiRouter      = require('./config/apiRoutes');
const webRouter      = require('./config/webRoutes');


mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', webRouter);
app.use('/api', apiRouter);

app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));
