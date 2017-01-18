const Surf     = require('../models/surf');

function surfsIndex(req, res) {
  Surf.find({}, (err, surfs) => {
    if(err) return res.status(500).send();
    return res.status(200).json({ surfs });
  });
}

module.exports    = {
  index: surfsIndex
};
