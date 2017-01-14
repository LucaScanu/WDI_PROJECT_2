const rp = require('request-promise');

function weather(req, res) {
  return rp(`https://api.darksky.net/forecast/4ba9fd38d3da05ee45a75b5589f473c2/${req.params.lat},${req.params.lng},units=ca`)
    .then(htmlString => {
      const json = JSON.parse(htmlString);
      return res.status(200).json({
        summary: json.daily.summary,
        temperatureMax: json.daily.temperatureMax
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
}

module.exports = {
  weather
};
