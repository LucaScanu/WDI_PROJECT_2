const mongoose        = require('mongoose');

const imageSchema      = new mongoose.Schema({
  name: String,
  image: String
});

imageSchema.set('toJSON', { getters: true, virtuals: false });

module.exports        = mongoose.model('Image', imageSchema);
