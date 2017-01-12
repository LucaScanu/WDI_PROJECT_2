const mongoose        = require('mongoose');

const surfspotSchema = new mongoose.Schema({
  name: String,
  location: String,
  lat: String,
  lng: String,
  image: String
});

surfspotSchema.set('toJSON', { getters: true, virtuals: false });

module.exports        = mongoose.model('Surfspot', surfspotSchema);
