const Image        = require('../models/image');


function imagesIndex(req, res) {
  Image.find({}, (err, images) => {
    if(err) return res.status(500).send();
    return res.status(200).json({ images });
  });
}

module.exports    = {
  index: imagesIndex
};
