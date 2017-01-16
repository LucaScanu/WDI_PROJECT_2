const mongoose        = require('mongoose');

const surfSchema      = new mongoose.Schema({
  name: String,
  location: String,
  lat: String,
  lng: String,
  img: String,
  comments: [ { type: mongoose.Schema.ObjectId, ref: 'Comment' } ]
});

surfSchema.set('toJSON', { getters: true, virtuals: false });

module.exports        = mongoose.model('Surf', surfSchema);
