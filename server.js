//*****requiring installed packages*******/////

const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const mongoose       = require('mongoose');

//*** The expressJWT package authenticates users that are logging in
//*** with a tokens
const expressJWT     = require('express-jwt');


const app            = express();
const config         = require('./config/config');
const apiRouter      = require('./config/apiRoutes');
const webRouter      = require('./config/webRoutes');

//*******connecting mongoose model************///
const databaseUrl    = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/surferparadiseapi';
mongoose.connect(databaseUrl);

//********setting up middleware*********////
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//** setting up the expressJWT middleware ***//
// If a token is found then the app will run as normal//
app.use('/api', expressJWT({ secret: config.secret })
.unless({
  path: [
    { url: '/api/register', methods: ['POST'] },
    { url: '/api/login',    methods: ['POST'] },
    { url: '/api/surfs',    methods: ['GET'] }
  ]
}));

//jwtErrorHandler is a method that return a simpler err message //
// if any
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  console.log('this is upset');
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'Unauthorized request..' });
}

//*********connecting routes************//
app.use('/', webRouter);
app.use('/api', apiRouter);

app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));
