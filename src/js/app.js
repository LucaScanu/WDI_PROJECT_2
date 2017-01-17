const App              = App || {};
const google           = google;

App.init               = function() {
  this.apiUrl          = 'http://localhost:3000/api';
  this.$main           = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.members').on('click', this.membersIndex.bind(this));
  $('.modal-body').on('submit', 'form', this.handleForm);
  if (this.getToken()) {
    this.loggedIn();
  } else {
    this.loggedOut();
  }
};

App.loggedIn           = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  App.initMap();
  App.getSurfs();
  $('.modal').modal('hide');
  $('body').addClass('clear');
  $('navbar-nav').addClass('clear');
};

App.loggedOut          = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  $('body').removeClass('clear');
  $('navbar-nav').removeClass('clear');
};

App.surfInfo           = function(surf, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    this.ajaxRequest(`http://localhost:3000/api/weather/${surf.lat}/${surf.lng}`, 'get', null, data => {
      $('.modal-body').html(`
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active">
              <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Overview</a>
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
              Welcome to ${surf.name},
              ${surf.location},
              The weather for today is ${data.summary}.
              <img src="${surf.img}">
            </div>
            <div role="tabpanel" class="tab-pane" id="weather">
              <iframe src="https://embed.windytv.com/?${surf.lat},${surf.lng},5,in:24,100m,waves,message,menu,marker,metric.wind.km/h" width="1000" height="700" frameborder="0"></iframe>
            </div>
            <div role="tabpanel" class="tab-pane" id="gallery">
            </div>
            <div role="tabpanel" class="tab-pane" id="settings">
            </div>
          </div>`);
      $('.modal').modal('show');
    });
  });
};

App.marker             = function(surf) {
  const latlng         = new google.maps.LatLng(surf.lat, surf.lng);
  const marker         = new google.maps.Marker({
    position: latlng,
    map: App.map,
    icon: '/images/surfing.png'
  });
  App.surfInfo(surf, marker);
};

App.loopSurfs          = function(data) {
  $.each(data.surfs, (index, surf) => {
    App.marker(surf);
  });
};

App.getSurfs           = function() {
  $.get('http://localhost:3000/api/surfs').done(this.loopSurfs);
};

App.initMap            = function() {
  const map            = document.getElementById('map');
  const mapOptions     = {
    center: new google.maps.LatLng(13.8302704,17.8480856),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{'featureType': 'administrative','elementType': 'labels.text.fill','stylers': [{'color': '#444444'}]},{'featureType': 'landscape','elementType': 'all','stylers': [{'color': '#f2f2f2'}]},{'featureType': 'poi','elementType': 'all','stylers': [{'visibility': 'off'}]},{'featureType': 'road','elementType': 'all','stylers': [{'saturation': -100},{'lightness': 45}]},{'featureType': 'road.highway','elementType': 'all','stylers': [{'visibility': 'simplified'}]},{'featureType': 'road.arterial','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},{'featureType': 'transit','elementType': 'all','stylers': [{'visibility': 'off'}]},{'featureType': 'water','elementType': 'all','stylers': [{'color': '#46bcec'},{'visibility': 'on'}]}]
  };
  this.map             = new google.maps.Map(map, mapOptions);
  this.getSurfs();
};

App.register           = function(e) {
  if(e) e.preventDefault();

  $('.modal-body').html(`
  <h2>Register</h2>
  <form method='post' action='/register'>
  <div class='form-group'>
  <input class='form-control' type='text' name='user[username]' placeholder='Username'>
  </div>
  <div class='form-group'>
  <input class='form-control' type='email' name='user[email]' placeholder='Email'>
  </div>
  <div class='form-group'>
  <input class='form-control' type='password' name='user[password]' placeholder='Password'>
  </div>
  <div class='form-group'>
  <input class='form-control' type='password' name='user[passwordConfirmation]' placeholder='Password Confirmation'>
  </div>
  <input class='btn btn-primary' type='submit' value='Register'>
  </form>
  </div>
  </div>
  </div>
  </div>
  `);
  $('.modal').modal('show');
};


App.login              = function(e) {
  if(e) e.preventDefault();
  $('.modal-body').html(`
    <h2>Login</h2>
    <form method='post' action='/login'>
    <div class='form-group'>
    <input class='form-control' type='email' name='email' placeholder='Email'>
    </div>
    <div class='form-group'>
    <input class='form-control' type='password' name='password' placeholder='Password'>
    </div>
    <input class='btn btn-primary' type='submit' value='Login'>
    </form>
    </div>
    </div>
    </div>
    </div>
    `);
  $('.modal').modal('show');
};

App.logout = function(e) {
  if(e) e.preventDefault();
  this.clearToken();
  this.loggedOut();
};

App.membersIndex       = function(e) {
  if(e) e.preventDefault();

  const url = `${this.apiUrl}/users`;

  return this.ajaxRequest(url, 'get', null, data => {
    this.$main.html(`
      <div class="card-deck-wrapper">
        <div class="card-deck">
        </div>
      </div>
    `);
    const $container = this.$main.find('.card-deck');
    $.each(data.users, (i, user) => {
      $container.append(`
        <div class="card col-md-4">
         <img class="card-img-top" src="#" alt="Card image cap">
         <div class="card-block">
           <h4 class="card-title">${user.username}</h4>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
           <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
         </div>
       </div>`);
    });
  });
};

App.handleForm         = function(e) {
  if(e) e.preventDefault();

  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  return App.ajaxRequest(url, method, data, data => {
    if(data.token) App.setToken(data.token);
    App.loggedIn();
  });
};

App.ajaxRequest        = function(url, method, data, callback) {
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

//****naming the setRequestHeader function and passing it into the membersIndex function's ajax request****//

App.setRequestHeader   = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${App.getToken()}`);
};

App.setToken           = function(token) {
  return window.localStorage.setItem('token', token);
};

App.getToken           = function() {
  return window.localStorage.getItem('token');
};

App.clearToken         = function() {
  return window.localStorage.clear();
};


$(App.init.bind(App));
