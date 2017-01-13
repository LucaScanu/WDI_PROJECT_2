const app            = app || {};
const google         = google;

app.surfInfo         = function(surf, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class="info-marker"><img src="${ surf.image }"><p>${ surf.name }</p></div>`
    });
    this.infoWindow.open(app.map, marker);
  });
};

app.marker           = function(surf) {

  const latlng       = new google.maps.LatLng(surf.lat, surf.lng);
  const marker       = new google.maps.Marker({
    position: latlng,
    map: app.map
  });
  app.surfInfo(surf, marker);
};

app.loopSurfs        = function(data) {
  $.each(data.surfs, (index, surf) => {
    app.marker(surf);
  });
};

app.getSurfs         = function() {
  $.get('http://localhost:3000/api/surfs').done(this.loopSurfs);
};

app.initMap          = function() {
  const map          = document.getElementById('map');
  const mapOptions   = {
    center: new google.maps.LatLng(13.8302704,17.8480856),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map           = new google.maps.Map(map, mapOptions);
  this.getSurfs();
};

$(app.initMap.bind(app));
