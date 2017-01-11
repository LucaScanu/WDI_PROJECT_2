const path = require('path');

function staticsHome(req, res) {
  return res.sendfile(path.join(__dirname, '../index.html'));
}

module.exports = {
  home: staticsHome
};
