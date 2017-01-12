const mongoose      = require('mongoose');

const databaseUrl   = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/surferparadise-api';
mongoose.connect(databaseUrl);

const Surfspot      = require('../models/surfspot');

const surfspot1     = new Surfspot({
  name: 'Canggu',
  location: 'Bali',
  lat: '-8.6428221',
  lng: '115.1175409',
  image: 'http://www.placestoseeinyourlifetime.com/wp-content/uploads/2015/03/Bali-Canggu-6.jpg'
});

surfspot1.save((err, surfspot) => {
  if(err) return console.log(err);
  return console.log(`${surfspot.name} was saved`);
});

const surfspot2     = new Surfspot({
  name: 'Sennen Cove',
  location: 'Bali',
  lat: '-8.6428221',
  lng: '115.1175409',
  image: 'http://www.placestoseeinyourlifetime.com/wp-content/uploads/2015/03/Bali-Canggu-6.jpg'
});

surfspot2.save((err, surfspot) => {
  if(err) return console.log(err);
  return console.log(`${surfspot.name} was saved`);
});
