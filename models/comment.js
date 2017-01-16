const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ],
  body: { type: String, required: true }
});

commentSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});


module.exports = mongoose.model('Comment', commentSchema);
