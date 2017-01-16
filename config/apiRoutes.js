const express         = require('express');
const router          = express.Router();

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const surfs           = require('../controllers/surfs');
const proxies         = require('../controllers/proxies');
// const comments        =

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/surfs')
  .get(surfs.index);

// router.route('/comments')
//   .post(comments.create);

router.route('/weather/:lat/:lng')
  .get(proxies.weather);

module.exports = router;
