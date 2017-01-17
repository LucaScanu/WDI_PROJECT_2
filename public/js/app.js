"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$(".members").on("click",this.membersIndex.bind(this)),$(".modal-body").on("submit","form",this.handleForm),this.getToken()?this.loggedIn():this.loggedOut()},App.loggedIn=function(){$(".loggedIn").show(),$(".loggedOut").hide(),App.initMap(),App.getSurfs(),$(".modal").modal("hide"),$("body").addClass("clear"),$("navbar-nav").addClass("clear")},App.loggedOut=function(){$(".loggedIn").hide(),$(".loggedOut").show(),$("body").removeClass("clear"),$("navbar-nav").removeClass("clear")},App.surfInfo=function(e,t){var a=this;google.maps.event.addListener(t,"click",function(){a.ajaxRequest("http://localhost:3000/api/weather/"+e.lat+"/"+e.lng,"get",null,function(t){$(".modal-body").html('\n          <ul class="nav nav-tabs" role="tablist">\n            <li role="presentation" class="active">\n              <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Overview</a>\n            </li>\n            <li role="presentation">\n              <a href="#weather" aria-controls="weather" role="tab" data-toggle="tab">Weather</a>\n            </li>\n            <li role="presentation">\n              <a href="#gallery" aria-controls="gallery" role="tab" data-toggle="tab">Gallery</a>\n            </li>\n            <li role="presentation">\n              <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>\n            </li>\n          </ul>\n\n          <!-- Tab panes -->\n          <div class="tab-content">\n            <div role="tabpanel" class="tab-pane active" id="home">\n              Welcome to '+e.name+",\n              "+e.location+",\n              The weather for today is "+t.summary+'.\n              <img src="'+e.img+'">\n            </div>\n            <div role="tabpanel" class="tab-pane" id="weather">\n              <iframe src="https://embed.windytv.com/?'+e.lat+","+e.lng+',5,in:24,100m,waves,message,menu,marker,metric.wind.km/h" width="1000" height="700" frameborder="0"></iframe>\n            </div>\n            <div role="tabpanel" class="tab-pane" id="gallery">\n            </div>\n            <div role="tabpanel" class="tab-pane" id="settings">\n            </div>\n          </div>'),$(".modal").modal("show")})})},App.marker=function(e){var t=new google.maps.LatLng(e.lat,e.lng),a=new google.maps.Marker({position:t,map:App.map,icon:"/images/surfing.png"});App.surfInfo(e,a)},App.loopSurfs=function(e){$.each(e.surfs,function(e,t){App.marker(t)})},App.getSurfs=function(){$.get("http://localhost:3000/api/surfs").done(this.loopSurfs)},App.initMap=function(){var e=document.getElementById("map"),t={center:new google.maps.LatLng(13.8302704,17.8480856),zoom:2,mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#46bcec"},{visibility:"on"}]}]};this.map=new google.maps.Map(e,t),this.getSurfs()},App.register=function(e){e&&e.preventDefault(),$(".modal-body").html("\n  <h2>Register</h2>\n  <form method='post' action='/register'>\n  <div class='form-group'>\n  <input class='form-control' type='text' name='user[username]' placeholder='Username'>\n  </div>\n  <div class='form-group'>\n  <input class='form-control' type='email' name='user[email]' placeholder='Email'>\n  </div>\n  <div class='form-group'>\n  <input class='form-control' type='password' name='user[password]' placeholder='Password'>\n  </div>\n  <div class='form-group'>\n  <input class='form-control' type='password' name='user[passwordConfirmation]' placeholder='Password Confirmation'>\n  </div>\n  <input class='btn btn-primary' type='submit' value='Register'>\n  </form>\n  </div>\n  </div>\n  </div>\n  </div>\n  "),$(".modal").modal("show")},App.login=function(e){e&&e.preventDefault(),$(".modal-body").html("\n    <h2>Login</h2>\n    <form method='post' action='/login'>\n    <div class='form-group'>\n    <input class='form-control' type='email' name='email' placeholder='Email'>\n    </div>\n    <div class='form-group'>\n    <input class='form-control' type='password' name='password' placeholder='Password'>\n    </div>\n    <input class='btn btn-primary' type='submit' value='Login'>\n    </form>\n    </div>\n    </div>\n    </div>\n    </div>\n    "),$(".modal").modal("show")},App.logout=function(e){e&&e.preventDefault(),this.clearToken(),this.loggedOut()},App.membersIndex=function(e){var t=this;e&&e.preventDefault();var a=this.apiUrl+"/users";return this.ajaxRequest(a,"get",null,function(e){t.$main.html('\n      <div class="card-deck-wrapper">\n        <div class="card-deck">\n        </div>\n      </div>\n    ');var a=t.$main.find(".card-deck");$.each(e.users,function(e,t){a.append('\n        <div class="card col-md-4">\n         <img class="card-img-top" src="#" alt="Card image cap">\n         <div class="card-block">\n           <h4 class="card-title">'+t.username+'</h4>\n           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\n           <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\n         </div>\n       </div>')})})},App.handleForm=function(e){e&&e.preventDefault();var t=""+App.apiUrl+$(this).attr("action"),a=$(this).attr("method"),n=$(this).serialize();return App.ajaxRequest(t,a,n,function(e){e.token&&App.setToken(e.token),App.loggedIn()})},App.ajaxRequest=function(e,t,a,n){return $.ajax({url:e,method:t,data:a,beforeSend:this.setRequestHeader.bind(this)}).done(n).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+App.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.clearToken=function(){return window.localStorage.clear()},$(App.init.bind(App));