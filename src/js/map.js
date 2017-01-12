const googleMap    = googleMap || {};
const google       = google;

googleMap.initMap  = function() {
  const map        = document.getElementById('map');
  const mapOptions = {
    center: new google.maps.LatLng(13.8302704,17.8480856),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map         = new google.maps.Map(map, mapOptions);
};

$(googleMap.initMap.bind(googleMap));
