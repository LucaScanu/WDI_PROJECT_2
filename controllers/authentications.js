const User        = require('../models/user');
const jwt         = require('jsonwebtoken');
const config      = require('../config/config');

function authenticationRegister(req, res) {
  console.log('running');
  User.create(req.body.user, (err, user) => {
    if(err) return res.status(500).json({ message: 'Something went wrong' });
    const token   = jwt.sign(user._id, config.secret);

    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user,
      token
    });
  });
}

function authenticationLogin(req, res) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err) return res.status(500).json({ message: 'Something went wrong' });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(404).json({ message: 'Unauthorized user!' });
    }
    const token   = jwt.sign(user._id, config.secret);

    return res.status(201).json({
      message: `Welcome back ${user.username}!`,
      user,
      token
    });
  });
}

module.exports    = {
  register: authenticationRegister,
  login: authenticationLogin
};
