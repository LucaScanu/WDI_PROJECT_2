const mongoose      = require('mongoose');

const databaseUrl   = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/surferparadiseapi';
mongoose.connect(databaseUrl);

const Surf      = require('../models/surf');

Surf.collection.drop();

const surf1     = new Surf({
  name: 'Canggu',
  location: 'Bali',
  lat: '-8.6428221',
  lng: '115.1175409',
  image: 'http://www.placestoseeinyourlifetime.com/wp-content/uploads/2015/03/Bali-Canggu-6.jpg'
});

surf1.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf2     = new Surf({
  name: 'Sennen Cove',
  location: 'Cornwall',
  lat: '50.0758252',
  lng: '-5.7052955',
  image: 'http://www.sennen-cove.com/images/surf17feb13_1.jpg'
});

surf2.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});
