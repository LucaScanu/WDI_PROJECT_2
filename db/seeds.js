const mongoose      = require('mongoose');

const databaseUrl   = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/surferparadiseapi';
mongoose.connect(databaseUrl);

const Surf      = require('../models/surf');
const User      = require('../models/user');
const Comment   = require('../models/comment');

Surf.collection.drop();
User.collection.drop();
Comment.collection.drop();

User.create({
  username: 'Luca',
  email: 'luca@luca.com',
  password: 'password',
  passwordConfirmation: 'password'
}, (err, user) => {
  Comment.create({
    userId: user._id,
    body: 'test test comment'
  }, (err, comment) => {
    const surf2     = new Surf({
      name: 'Sennen Cove',
      location: 'Cornwall',
      lat: '50.0758252',
      lng: '-5.7052955',
      img: 'http://www.sennen-cove.com/images/surf17feb13_1.jpg'
    });

    surf2.comments.push(comment._id);

    surf2.save((err, surf) => {
      if(err) return console.log(err);
      return console.log(`${surf.name} was saved`);
    });
  });
});

const surf1     = new Surf({
  name: 'Canggu',
  location: 'Bali',
  lat: '-8.6428221',
  lng: '115.1175409',
  img: 'https://static.pexels.com/photos/70223/pexels-photo-70223.jpeg'
});

surf1.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf3     = new Surf({
  name: 'Hoddevik',
  location: 'Norway',
  lat: '61.9942893',
  lng: '5.1556246,9',
  img: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/ce/5b/bb/valley-of-epicness.jpg'
});

surf3.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf4     = new Surf({
  name: 'Waikiki',
  location: 'Hawaii',
  lat: '21.2326624',
  lng: '-157.4717152',
  img: 'http://data.whicdn.com/images/64506585/original.jpg'
});

surf4.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf5     = new Surf({
  name: 'Lagos',
  location: 'Portugal',
  lat: '37.1489231',
  lng: '-8.7934113',
  img: 'http://trekity.com/wp-content/uploads/2012/07/1440505300_4dad3f03e1_z-640x265.jpg'

});

surf5.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf6     = new Surf({
  name: 'El Paredon',
  location: 'Guatemala',
  lat: '13.917221',
  lng: '-91.0777439',
  img: 'https://static.pexels.com/photos/133006/pexels-photo-133006.jpeg'
});

surf6.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf7     = new Surf({
  name: 'Hossegor',
  location: 'France',
  lat: '43.6282892',
  lng: '-1.4151576',
  img: 'http://activeazur.wpengine.netdna-cdn.com/wp-content/uploads/2015/05/surfing-graviere.jpg'

});

surf7.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf8     = new Surf({
  name: 'Tofo Beach',
  location: 'Mozambique',
  lat: '-23.9263504',
  lng: '35.652696',
  img: 'http://www.tofoaccommodation.info/wp-content/uploads/2013/06/tofinho-point.jpg'
});

surf8.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf9     = new Surf({
  name: 'San Vicente de la Barquera',
  location: 'Spain',
  lat: '43.3653006',
  lng: '-4.560061',
  img: 'http://aff.bstatic.com/images/hotel/max500/366/36698762.jpg'
});

surf9.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf10     = new Surf({
  name: 'Sayulita',
  location: 'Mexico',
  lat: '20.8699963',
  lng: '-105.4439873',
  img: 'https://static.pexels.com/photos/129459/pexels-photo-129459.jpeg'
});

surf10.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf11     = new Surf({
  name: 'Tamarindo',
  location: 'Costa Rica',
  lat: '10.2995277',
  lng: '-85.8481682',
  img: 'https://waltzingmorethanmatildadotcom1.files.wordpress.com/2014/01/016.jpg'
});

surf11.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf12     = new Surf({
  name: 'Bundoran Beach',
  location: 'Ireland',
  lat: '54.4793955',
  lng: '-8.274684',
  img: 'http://www.travelireland.org/images/headers/bundoran_beach_donegal_1260x430.jpg'

});

surf12.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf13     = new Surf({
  name: 'Tofino, Vancouver Island',
  location: 'Canada',
  lat: '49.1239533',
  lng: '-125.91443',
  img: 'http://www.masterstudio.it/pics/big/add6ae424e33b4c55e73f691c857500e.jpg'

});

surf13.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf14     = new Surf({
  name: 'Watergate Bay',
  location: 'Cornwall',
  lat: '50.4444994',
  lng: '-5.0456217',
  img: 'https://www.breaksincornwall.com/wp-content/files_mf/cache/th_1bff74efafdca50cff65656f946109fa_watergatebay165.jpg'
});

surf14.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf15     = new Surf({
  name: 'Superbank, Gold Coast',
  location: 'Australia',
  lat: '-28.1717148',
  lng: '153.5524275',
  img: 'http://cdn.blog.queensland.com/wp-content/uploads/2013/02/how-to-surf-the-gold-coast.jpg'
});

surf15.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf16     = new Surf({
  name: 'Oahu',
  location: 'Hawaii',
  lat: '21.4841599',
  lng: '-158.245427',
  img: 'http://75d6c1c9155b031cbab1-d46475ba7b2b029c2fc6c2ad83051f70.r80.cf2.rackcdn.com/dev/destinations/Hawaii/Oahu/Oahu_hero.jpg'
});

surf16.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf17     = new Surf({
  name: 'Mentawai Islands',
  location: 'Indonesia',
  lat: '-2.4089393',
  lng: '99.1114057',
  img: 'http://cdn2.theinertia.com/wp-content/gallery/islandeye-photo/islandeye-9.jpg'
});

surf17.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf18     = new Surf({
  name: 'Jeffrey\'s Bay',
  location: 'South Africa',
  lat: '-34.0568717',
  lng: '24.8325964',
  img: 'http://jbay.islandvibe.co.za/wp-content/uploads/sites/10/2014/10/beach-music-guesthouse-sun-set-jeffreys-south-africa-bay.jpg'
});

surf18.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf19     = new Surf({
  name: 'Fuerteventura',
  location: 'Canary Islands',
  lat: '28.4007628',
  lng: '-14.4463942',
  img: 'http://www.whitebeachholidays.com/blog/wp-content/uploads/2014/11/Fuerteventura.jpg'
});

surf19.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf20     = new Surf({
  name: 'Cloud Nine, Siargao Island',
  location: 'Philippines',
  lat: '9.8493543',
  lng: '125.7933017',
  img: 'http://www.kawayansiargaoresort.com/images/surf/cloud9-surf1.jpg'
});

surf20.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf21     = new Surf({
  name: 'Florianopolis',
  location: 'Brasil',
  lat: '-27.6094088',
  lng: '-48.7647741',
  img: 'https://static.pexels.com/photos/4948/sea-sunset-sunny-beach.jpeg'
});

surf21.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf22     = new Surf({
  name: 'Sultans, North Male',
  location: 'Maldives',
  lat: '4.1750439',
  lng: '73.5011186',
  img: 'http://www.surfertoday.com/images/stories/thanburudhoo2.jpg'
});

surf22.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf23     = new Surf({
  name: 'Samoa Islands',
  location: 'Samoa',
  lat: '-13.7561677',
  lng: '-172.6613372',
  img: 'https://s-media-cache-ak0.pinimg.com/originals/3e/50/23/3e50232b8377200e631f676596f5ff23.jpg'
});

surf23.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf24     = new Surf({
  name: 'Manu Bay, Raglan',
  location: 'New Zealand',
  lat: '-37.8955998',
  lng: '174.3761882',
  img: 'http://2.bp.blogspot.com/-xha3jVky0l4/TvS_J-qqv7I/AAAAAAAABPo/7yJsdeV20Ow/s640/raglan900.jpg'
});

surf24.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});

const surf25     = new Surf({
  name: 'Tavarua Island',
  location: 'Fiji',
  lat: '-17.8575796',
  lng: '177.2001423',
  img: 'https://static.pexels.com/photos/139507/pexels-photo-139507.jpeg'
});

surf25.save((err, surf) => {
  if(err) return console.log(err);
  return console.log(`${surf.name} was saved`);
});
