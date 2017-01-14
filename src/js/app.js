const app            = app || {};
const google         = google;

app.surfInfo         = function(surf, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    // <img src="${surf.image}">
    // <p>${ surf.name }</p>
    // <a target="_blank" href="https://www.windytv.com/${surf.lat}/${surf.lng}">
    //   ${data.summary}
    // </a>

    $.get(`http://localhost:3000/api/weather/${surf.lat}/${surf.lng}`).done(data => {
      $('.modal-body').html(`
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active">
            <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a>
          </li>
          <li role="presentation">
            <a href="#weather" aria-controls="weather" role="tab" data-toggle="tab">Weather</a>
          </li>
          <li role="presentation">
            <a href="#gallery" aria-controls="gallery" role="tab" data-toggle="tab">Gallery</a>
          </li>
          <li role="presentation">
            <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="home">
            ${data.summary}
          </div>
          <div role="tabpanel" class="tab-pane" id="weather">
            <iframe src="https://embed.windytv.com/?${surf.lat},${surf.lng},8,in:24,100m,temp,menu,marker,metric.wind.km/h" width="750" height="500" frameborder="0"></iframe>
          </div>
          <div role="tabpanel" class="tab-pane" id="gallery">
          </div>
          <div role="tabpanel" class="tab-pane" id="settings">
          </div>
        </div>`);
      $('.modal').modal('show');

      // this.infoWindow = new google.maps.InfoWindow({
      //   content:
      //   ``
      // });
      // this.infoWindow.open(app.map, marker);
    });
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
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{'featureType': 'administrative','elementType': 'labels.text.fill','stylers': [{'color': '#444444'}]},{'featureType': 'landscape','elementType': 'all','stylers': [{'color': '#f2f2f2'}]},{'featureType': 'poi','elementType': 'all','stylers': [{'visibility': 'off'}]},{'featureType': 'road','elementType': 'all','stylers': [{'saturation': -100},{'lightness': 45}]},{'featureType': 'road.highway','elementType': 'all','stylers': [{'visibility': 'simplified'}]},{'featureType': 'road.arterial','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},{'featureType': 'transit','elementType': 'all','stylers': [{'visibility': 'off'}]},{'featureType': 'water','elementType': 'all','stylers': [{'color': '#46bcec'},{'visibility': 'on'}]}]
  };
  this.map           = new google.maps.Map(map, mapOptions);
  this.getSurfs();
};

$(app.initMap.bind(app));
