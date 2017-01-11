const Surfspot     = require('../models/surfspot');

function surfspotsIndex(req, res) {
  Surfspot.find((err, surfspots) => {
    if(err) return res.status(500).send();
    return res.status(200).json(surfspots);
  });
}

module.exports     = {
  index: surfspotsIndex
};
