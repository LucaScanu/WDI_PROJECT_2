const Surf     = require('../models/surf');
const Comment  = require('../models/comment');
const User     = require('../models/user');

// function surfsCreate(req, res) {
//   Surf.create(req.body.surf, (err, surf) => {
//     if (err) return res.status(500).json({ success: false, message: err });
//     if (!surf) return res.status(500).json({ success: false, message: 'Please send the correct information to create a spot.' });
//     return res.status(201).json({ surf: surf });
//   });
// }

function surfsIndex(req, res) {
  Surf.find({})
  .populate({
    path: 'comments',
    populate: {
      path: 'userId',
      model: 'User'
    }
  })
  .exec((err, surfs) => {
    if(err) return res.status(500).send();
    return res.status(200).json({ surfs });
  });
}

// function surfsShow(req, res) {
//   Surf.findById(req.params.id, (err, surf) => {
//     if(err) return res.status(500).json({ message: 'Something went wrong'});
//     if(!surf) return res.status(404).json({ message: 'spot not found!'});
//     return res.status(200).json({ surf: surf });
//   });
// }

// function surfsUpdate(req, res) {
//   Surf.findByIdAndUpdate(req.params.id, req.body.surf, { new: true }, (err, surf) => {
//     if(err) return res.status(500).json({ message: 'Something went wrong'});
//     if(!surf) return res.status(404).json({ message: 'spot not found!'});
//     return res.status(200).json({ surf: surf });
//   });
// }

// function surfsDelete(req, res) {
//   Surf.findByIdAndRemove(req.params.id, (err, surf) => {
//     if(err) return res.status(500).json({ message: 'Something wentwrong'});
//     if(!surf) return res.status(404).json({ message: 'spot not found!'});
//     return res.status(204).send();
//   });
// }

module.exports    = {
  // create: surfsCreate,
  index: surfsIndex
  // show: surfsShow,
  // update: surfsUpdate,
  // delete: surfsDelete
};
