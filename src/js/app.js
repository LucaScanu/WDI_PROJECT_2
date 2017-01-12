const app         = app || {};
const google            = google;

app.marker        = function(surf) {
  console.log(surf);
  const latlng          = new google.maps.LatLng(surf.lat, surf.lng);
  const marker          = new google.maps.Marker({
    position: latlng,
    map: this.map
  });
};

app.loopSurfs = function(data) {
  $.each(data.surfs, (index, surf) => {
    app.marker(surf);
  });
};

app.getSurfs  = function() {
  $.get('http://localhost:3000/api/surfs').done(this.loopSurfs);
};

app.initMap       = function() {
  const map             = document.getElementById('map');
  const mapOptions      = {
    center: new google.maps.LatLng(13.8302704,17.8480856),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map              = new google.maps.Map(map, mapOptions);
  this.getSurfs();
};

$(app.initMap.bind(app));
