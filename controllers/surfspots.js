const Surfspot     = require('../models/surfspot');

function surfspotsCreate(req, res) {
  Surfspot.create(req.body.surfspot, (err, surfspot) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!surfspot) return res.status(500).json({ success: false, message: 'Please send the correct information to create a spot.' });
    return res.status(201).json(surfspot);
  });
}

function surfspotsIndex(req, res) {
  Surfspot.find((err, surfspots) => {
    if(err) return res.status(500).send();
    return res.status(200).json(surfspots);
  });
}

function surfspotsShow(req, res) {
  Surfspot.findById(req.params.id, (err, surfspot) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    if(!surfspot) return res.status(404).json({ message: 'spot not found!'});
    return res.status(200).json({ surfspot: surfspot });
  });
}

function surfspotsUpdate(req, res) {
  Surfspot.findByIdAndUpdate(req.params.id, req.body.surfspot, { new: true }, (err, surfspot) => {
    if(err) return res.status(500).json({ message: 'Something went wrong'});
    if(!surfspot) return res.status(404).json({ message: 'spot not found!'});
    return res.status(200).json({ surfspot: surfspot });
  });
}

function surfspotsDelete(req, res) {
  Surfspot.findByIdAndRemove(req.params.id, (err, surfspot) => {
    if(err) return res.status(500).json({ message: 'Something wentwrong'});
    if(!surfspot) return res.status(404).json({ message: 'spot not found!'});
    return res.status(204).send();
  });
}

module.exports    = {
  create: surfspotsCreate,
  index: surfspotsIndex,
  show: surfspotsShow,
  update: surfspotsUpdate,
  delete: surfspotsDelete
};
